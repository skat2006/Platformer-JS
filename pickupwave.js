#pragma strict

private var yPosition:float;

function Start () {
	yPosition = transform.position.y;
}

function Update () {
	if(Time.timeScale == 1){
		transform.position.y = yPosition + Mathf.Sin(Time.time * 6)/10;
	}
}
