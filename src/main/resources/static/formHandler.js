import {fetchItem } from './fetchItem.js';

export function formHandler(){
	const form = document.getElementById("item-form");
	const submitButton = form.querySelector('button[type="submit"]');
	const cancelButton = document.getElementById("cancel-btn");
	
	//編集中IDはdata属性で管理
	form.dataset.editingId = "";
	
	//submit処理
	form.addEventListener("submit", async (e)=> {
		e.preventDefault();
		
		const name = document.getElementById("name").value;
		const quantity = parseInt(document.getElementById("quantity").value);
		const price = parseFloat(document.getElementById("price").value);
		
		try{
			let response;
			
			if(form.dataset.editingId !== ""){
				//編集モード
				const id = form.dataset.editingId;
				response = await fetch(`http://localhost:8080/api/items/${id}`, {
					method: "PUT",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({name, quantity, price})
				});
			}else{
				//新規作成モード
				response = await fetch("http://localhost:8080/api/items", {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({name, quantity, price})
				});
			}
			
			if(!response.ok) throw new Error("保存に失敗しました");
			
			//処理完了
			form.reset();
			submitButton.textContent="作成";
			form.dataset.editingId = "";
			fetchItem();
		}catch(error){
			console.error(error);
		}
	});
	
	//キャンセルボタンの挙動
	cancelButton.addEventListener('click', () => {
		form.reset();
		form.dataset.editingId = "";
		submitButton.textContent = "作成";
	})
}

//編集ボタン押下時に呼び出す関数
export function setEditMode(id, name, quantity, price){
	const form = document.getElementById("item-form");
	const submitButton = form.querySelector('button[type="submit"]');
	
	console.log("押された編集ボタンのID:", id); // ←ここでIDを確認
	form.dataset.editingId = id;
	
	document.getElementById("name").value = name;
	document.getElementById("quantity").value = parseInt(quantity);
	document.getElementById("price").value = parseFloat(price);
	
	submitButton.textContent= "更新";
	console.log("フォーム編集ID:", form.dataset.editingId); // ←セット後の値確認
}