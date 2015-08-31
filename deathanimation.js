#pragma strict
// Анимация смерти

var death1:Texture;
var death2:Texture;
var death3:Texture;
var deathSound:AudioClip;

//счетчик времени
private var counter:float = 0.0;
private var frameRate:float = 12.0;

function Start () {
	audio.PlayOneShot(deathSound);
}

function Update () {
	//Следим за временем
	counter += Time.deltaTime*frameRate;
	//Вычисление нужной текстуры опираясь на время
	if(counter > 0 && renderer.material.mainTexture != death1){
		renderer.material.mainTexture = death1;
	}
	if(counter > 1 && renderer.material.mainTexture != death2){
		renderer.material.mainTexture = death2;
	}
	if(counter > 2 && renderer.material.mainTexture != death3){
		renderer.material.mainTexture = death3;
	}
	if(counter > 3 && renderer.enabled != false){
		renderer.enabled = false;
	}
	//уничтожаем объект
	if(counter > frameRate*1.5){
		Destroy(gameObject);
	}
}
