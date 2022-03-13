import axios, { AxiosError } from 'axios'
import fs from 'fs'

let lineCount = 0

async function readLogFile(path: string) {
  const file = fs.readFileSync(path).toString()
  const lines = file.split('\n')
  if (lines.length < lineCount) {
    lineCount = 0
  }
  const diff = lines
    .slice(lineCount - 1, lines.length)
    .filter((line) => line.trim().length > 0)
  lineCount = lines.length
  sendMessage(diff)
}

async function sendToDiscord(content: string) {
  if (content.length === 0) {
    return
  }
  console.log(`Sending ${content.length} characters to discord`)
  const config = JSON.parse(fs.readFileSync('config.json').toString())

  try {
    await axios.post(
      `https://discord.com/api/channels/${config.channelId}/messages`,
      {
        content: '```\n' + content + '\n```',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bot ${config.token}`,
        },
      }
    )
  } catch (e) {
    if ((e as AxiosError).response) {
      console.warn((e as AxiosError).response?.statusText)
      console.warn((e as AxiosError).response?.data)
    } else {
      console.warn(e)
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 3000))
}

async function sendMessage(lines: string[]) {
  if (lines.join('\n').length <= 1900) {
    // 1950文字以内なのでそのまま送信
    await sendToDiscord(lines.join('\n'))
    return
  }
  let messages = []
  while (lines.length > 0) {
    const newMessage = lines.shift()
    if (newMessage === undefined) {
      break
    }
    if (messages.join('\n').length + newMessage.length >= 1900) {
      await sendToDiscord(messages.join('\n'))
      messages = []
    }
    messages.push(newMessage)
  }
  if (messages.length > 0) {
    await sendToDiscord(messages.join('\n'))
  }
}

async function main() {
  console.log('Starting log-sender')

  const path = '/papermc/logs/latest.log'
  if (fs.existsSync(path)) {
    readLogFile(path)
  }

  fs.watchFile(path, (_curr, _prev) => {
    readLogFile(path)
  })
}

;(async () => {
  main()
})()
