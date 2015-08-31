#pragma strict

// Движение камеры за персонажем

var deadZone:float;
var followVertical = false;
var followHorizontal = true;
var minimumHeight:float;

private var cam : GameObject;

function Start () {
	// Находим камеру
	cam = GameObject.Find("Main Camera");
}

function Update () {
	// Горизонталное следование
	if(followHorizontal == true){
		if (cam.transform.position.x >= transform.position.x + deadZone){
			cam.transform.position.x = transform.position.x + deadZone;
		}
		if (cam.transform.position.x <= transform.position.x - deadZone){
			cam.transform.position.x = transform.position.x - deadZone;
		}
	}

	// Вертикальное следование
	if(followVertical == true){
		if (cam.transform.position.y >= transform.position.y + deadZone){
			cam.transform.position.y = transform.position.y + deadZone;
		}	
		if (cam.transform.position.y <= transform.position.y - deadZone){
			cam.transform.position.y = transform.position.y - deadZone;
		}
	}

	// Ограничение полета
	if(cam.transform.position.y < minimumHeight){
		cam.transform.position.y = minimumHeight;
	}
}
