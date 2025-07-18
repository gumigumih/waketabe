# わけたべ

みんなで分け合って食べた分だけ、かんたん・正確に割り勘できるアプリ

![わけたべ](https://waketabe.meggumi.com/ogp.png)

## 📖 概要

**わけたべ**は、女子会やイベントなどでいろんな料理を注文し、
「誰が何を食べたか」をもとに一人あたりの支払い金額を自動計算できる Web アプリケーションです。

- ✅ 参加者・料理数制限なし
- ✅ 料理ごとに「食べた人」を選択
- ✅ 食べた分だけ正確に割り勘
- ✅ 高品質な画像保存
- ✅ スマホ・PC両対応

## 🚀 デモ

[https://waketabe.meggumi.com](https://waketabe.meggumi.com)

## ✨ 主な機能

### 参加者管理

- 参加者（ニックネーム可）を自由に追加・編集・削除
- 参加者数制限なし

### 料理入力

- 料理名・金額を入力
- 料理ごとに「誰が食べたか」を複数人選択
- 料理の編集・削除も可能

### 割り勘計算

- 料理ごとに食べた人で割り勘し、合計金額を自動計算
- 一人ひとりの支払い金額を分かりやすく表示

### 画像保存

- 高解像度での画像保存
- タイムスタンプ付きファイル名
- わけたべロゴ付き

## 🛠️ 技術スタック

- **フロントエンド**: React 19 + TypeScript
- **スタイリング**: Tailwind CSS
- **アイコン**: FontAwesome
- **画像保存**: html2canvas-pro
- **データ永続化**: LocalStorage
- **ビルドツール**: Vite

## 📦 インストール

```bash
# リポジトリをクローン
git clone https://github.com/gumigumih/waketabe.git
cd waketabe

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## 🚀 ビルド

```bash
# 本番用ビルド
npm run build

# プレビュー
npm run preview
```

## 📱 対応ブラウザ

- Chrome (推奨)
- Firefox
- Safari
- Edge

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

---

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 📋 リリースノート

最新の更新内容や機能追加については [CHANGELOG.md](CHANGELOG.md) をご覧ください。

### 更新履歴

#### v1.0.0 (2025-01-17)

- 初回リリース
- 参加者管理機能（制限なし）
- 料理入力機能（食べた人選択）
- 割り勘計算機能
- 計算結果表示機能
- 画像保存機能
- 戻る機能とデータ永続化

## 🔗 リンク

- **Web サイト**: [https://waketabe.meggumi.com](https://waketabe.meggumi.com)
- **リリースノート**: [CHANGELOG.md](CHANGELOG.md)

---

**わけたべ** - 食べた分だけ、かんたん・正確に割り勘できるアプリ
