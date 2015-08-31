#pragma strict

//Шрифт
var fontFace:Font;
private var counter:float = 0.0;

function Start () {
	fontFace.material.color.a = 0.0;
}

function Update () {
	//Счет времени
	counter += Time.deltaTime;

	//Затухание текста
	if(counter > 0.5 && counter < 2.5 && fontFace.material.color.a < 1){
		fontFace.material.color.a += Time.deltaTime/2;
	}
	//Убираем текст
	if(counter > 2.5){
		fontFace.material.color.a -= Time.deltaTime/2;
		if(fontFace.material.color.a <= 0) Destroy(gameObject);
	}
}
