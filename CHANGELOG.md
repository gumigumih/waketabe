# わけたべ - リリースノート

## [v1.0.0] - 2025-07-18

### 🎉 初回リリース

わけたべは、女子会やイベントなどでいろんな料理を注文し、「誰が何を食べたか」をもとに一人あたりの支払い金額を自動計算できる Web アプリケーションです。

### ✨ 基本機能

#### 参加者管理

- 参加者（ニックネーム可）を自由に追加・編集・削除
- 参加者数制限なし

#### 料理入力

- 料理名・金額を入力
- 料理ごとに「誰が食べたか」を複数人選択
- 料理の編集・削除も可能

#### 割り勘計算

- 料理ごとに食べた人で割り勘し、合計金額を自動計算
- 一人ひとりの支払い金額を分かりやすく表示

#### 計算結果表示

- 参加者別の支払い状況を詳細表示
- 食べた料理の内訳を表示
- 最適な精算方法を自動算出

#### 画像保存

- 高解像度での画像保存
- タイムスタンプ付きファイル名
- わけたべロゴ付き

#### 戻る機能

- 結果画面から料理入力に戻れる
- 料理入力から参加者入力に戻れる
- 入力した内容は消えない（LocalStorage保存）

### 🎨 UI/UX

- モダンなデザイン
- レスポンシブ対応
- キーボード操作対応
- 直感的な操作フロー

### 🔧 技術仕様

- React 19 + TypeScript
- Tailwind CSS
- FontAwesome
- html2canvas-pro
- LocalStorage（データ永続化）

---

**わけたべ** - 食べた分だけ、かんたん・正確に割り勘できるアプリ

https://waketabe.meggumi.com
