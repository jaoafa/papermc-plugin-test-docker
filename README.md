# papermc-plugin-test-docker

プラグインの動作テストを行うことを目的としたプロジェクトです。

## Containers

以下のコンテナを含みます。

- PaperMC Docker コンテナ ([papermc/Dockerfile](https://github.com/jaoafa/papermc-plugin-test-docker/blob/master/papermc/Dockerfile))
- ログを Discord に投げる簡易スクリプト ([log-sender/Dockerfile](https://github.com/jaoafa/papermc-plugin-test-docker/blob/master/log-sender/Dockerfile))

## Installation

 Docker 環境および Docker Compose が必要。

1. `git clone https://github.com/jaoafa/papermc-plugin-test-docker.git`
2. `cd papermc-plugin-test-docker`
3. ログの出力先設定として、`log-sender/config.json` にファイルを作成して設定。後述する [Configuration](#Configuration) にて解説
4. `docker-compose up --build --abort-on-container-exit` で起動
5. `docker-compose down` で停止

`--abort-on-container-exit` フラグにより PaperMC サーバもしくは `log-sender` が落ちると自動的にコンテナが終了します。

### Systemd への登録

```shell
cd SystemdFiles
chmod 777 install-systemd.sh
sudo ./install-systemd.sh
```

## Configuration

起動前に必ず作成しなければならないファイルは `log-sender/config.json` のみです。

### log-sender/config.json

PaperMC が出力したログを Discord に自動投稿する `log-sender` の設定ファイルです。JSON 形式で設定します。

- `token`: Discord Bot のトークン
- `channelId`: 送信先のチャンネル ID (Bot が書き込めることを確認してください)

## Data

PaperMC サーバのデータの一部は `data/` ディレクトリ内に保存されます。

以下のファイルは起動時に「追加」され、PaperMC サーバの起動時に参照されますがサーバによって更新されることはありません。

- `data/bukkit.yml`: Bukkit の設定ファイルです。エンドワールドの無効化のために設定されています。
- `data/ops.json`: OP 権限が付与されたプレイヤーを管理するファイルです。ホワイトリスト運用のため、このファイルに書き込まれたプレイヤーのみ参加できます。
- `data/server.properties`: サーバの基本設定ファイルです。

以下のディレクトリは起動時に「マウント」され、PaperMC サーバの起動時に参照されるほかサーバによって更新が反映されます。

- `data/logs/` ログファイルディレクトリです。
- `data/plugins/`: プラグインディレクトリです。
- `data/worlds/Jao_Afa/`: Jao_Afa ワールドのワールドデータディレクトリです。
- `data/worlds/Jao_Afa_nether`: Jao_Afa_nether ワールドのワールドデータディレクトリです。
- `data/mvnrepositorys/`: Maven のローカルリポジトリです。プラグインアップデート時に利用されます。

