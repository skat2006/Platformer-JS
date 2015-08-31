#pragma strict

//Управление меню

private var blankGfx:Texture;

function OnGUI () {
//Кнопка продолжения
	if(GUI.Button(Rect(0,Screen.height/3*2,Screen.width/3,Screen.height/3),blankGfx, "")){
	//Уровни
		switch(PlayerPrefs.GetFloat("savedLevel")) {
			Case 1: 
				Application.LoadLevel("level1");
				break;
			Case 2:
				Application.LoadLevel("level2");
				break;
			Case 3:
				Application.LoadLevel("level3");
				break;
			Default:
				Application.LoadLevel("level1")
		}
	}
	
	//Кнопка новой игры
	if(GUI.Button(Rect(Screen.width/3*2,Screen.height/3*2,Screen.width/3,Screen.height/3),blankGfx, "")){
		//Убиваем лишнее
		PlayerPrefs.DeleteAll();
		Application.LoadLevel("level1");
	}
}
