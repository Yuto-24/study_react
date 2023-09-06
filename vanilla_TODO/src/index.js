// import styles from "/vanilla_todo/src/styles.css" assert { type: 'css' }

const getParent2 = (meta) => {
    const parentTarget = meta.parentNode;
    const returnPara = parentTarget.parentNode;
    return returnPara;
}

const conductDel = (delButton, isComp = false) => {
    // 押されたボタンの親タグの親タグを未完了リストから削除
    const delTarget = getParent2(delButton);

    // 削除
    if (isComp) {
        document.getElementById("complete-list").removeChild(delTarget);
    } else {
        document.getElementById("incomplete-list").removeChild(delTarget);
    }
}

const conductComp = (mvButton) => {
    // 押されたボタンの親タグの親タグを未完了リストから完了リストへ移動
    const completeText = mvButton.parentNode.firstElementChild.textContent;
    // console.log(`origin text: ${completeText}`);

    // 要素の削除
    conductDel(mvButton);

    // リストの追加
    addItem(completeText, "complete-list", true);
}

const conductReturn = (mvButton) => {
    const completeText = mvButton.parentNode.firstElementChild.textContent;
    // console.log(`origin text: ${completeText}`);

    // 要素の削除
    conductDel(mvButton, true);

    // リストの追加
    addItem(completeText, "incomplete-list");
}

const addItem = (inputText, parentTagId, isComp = false) => {
    // li タグを生成
    const li = document.createElement("li");

    // div タグを生成
    const div = document.createElement("div");
    div.className = "list-row";
    li.appendChild(div);

    // p タグを生成
    const p = document.createElement("p");
    p.innerHTML = inputText;
    div.appendChild(p);

    // button タグを生成
    if (isComp) {
        // 戻すボタン
        const returnButton = document.createElement("button");
        returnButton.textContent = "戻す"
        returnButton.addEventListener("click", () => {
            conductReturn(returnButton);
        });
        div.append(returnButton)
    } else {
        // 完了ボタン
        const compButton = document.createElement("button");
        compButton.textContent = "完了";
        compButton.addEventListener("click", () => {
            conductComp(compButton);
        });
        div.appendChild(compButton);

        // 削除ボタン
        const delButton = document.createElement("button");
        delButton.textContent = "削除";
        delButton.addEventListener("click", () => {
            conductDel(delButton);
        });
        div.appendChild(delButton);
    }

    // 実際に追加
    document.getElementById(parentTagId).appendChild(li);
}

const onClickAdd = () => {
    // テキストボックスの中身を取得し、値を初期化
    const inputHTML = document.getElementById("add-text");
    const inputText = inputHTML.value;

    addItem(inputText, "incomplete-list")
    inputHTML.value = "";

}

document.getElementById("add-button").addEventListener("click", () => onClickAdd());
