const Keys = Object.freeze({
	COOKIE_DOWNLOAD_PROMPT: "downloadPrompt",
});
const MSG_REMIND =
	"您已關閉下載檔案前要先進行瀏覽器設定的提醒，若日後下載檔案發生問題，仍可前往右上角的「個人設定/操作提示」開啟此設定。";
const MSG_INSTRUCT =
	"請留意新開視窗網址列後方是否有「快顯」或「彈出」視窗被封鎖的警告，請點選該訊息並允許後再次執行";

const Tabs = Object.freeze({
	INFO: "INFO",
	AUTH: "AUTH",
	CHANGE_PWORD: "CHANGE_PWORD",
	INSTRUCTION: "INSTRUCTION",
});

const Settings = {
	Keys,
	Tabs,
	MSG_INSTRUCT,
	MSG_REMIND,
};

export default Settings;
