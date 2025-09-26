import {fetchItem} from './fetchItem.js';
import {formHandler} from './formHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchItem();            // テーブル描画
  formHandler();        // 編集初期化
});