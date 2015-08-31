#pragma strict

var levelNumber:float;
var nextLevel:String;

function Start () {
	//Сохранение уровня
	PlayerPrefs.SetFloat("savedLevel", levelNumber);
}

//Загрузка уровня
function OnTriggerEnter (other : Collider){
	if(other.tag == "Player"){
		Application.LoadLevel(nextLevel);
	}
}
