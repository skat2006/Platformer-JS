#pragma strict

var health:int = 3;
var hitSound:AudioClip;
var deathAnim:GameObject;
var heart1:GUITexture;
var heart2:GUITexture;
var heart3:GUITexture;
var heartWhole:Texture;
var heartHalf:Texture;
var heartEmpty:Texture;
var heartSound:AudioClip;

private var dead = false;
private var colorCounter:float = 0.0;


function Update () {
	if(renderer.material.color.b == 0.25){
		colorCounter += Time.deltaTime;
		if(colorCounter > 0.25){
			renderer.material.color.g = 1;
			renderer.material.color.b = 1;
			colorCounter = 0.0;
		}
	}

	//Смерть - Перезагрузка
	if(transform.position.y < -10){
		var lvlName:String = Application.loadedLevelName;
		Application.LoadLevel(lvlName);
	}
}

//Что случилось?
function OnTriggerStay (other : Collider){
	if(other.tag == "enemy" && renderer.material.color.b != 0.25 && !dead || other.tag == "spikes" && renderer.material.color.b != 0.25 && !dead){
		audio.PlayOneShot(hitSound);
		renderer.material.color.g = 0.25;
		renderer.material.color.b = 0.25;
		checkHealth();
		if(other.name == "enemybullet(Clone)") Destroy(other.gameObject);
	}
}

function OnCollisionStay (other : Collision){
	if(other.collider.tag == "enemy" && renderer.material.color.b != 0.25 && !dead || other.collider.tag == "spikes" && renderer.material.color.b != 0.25 && !dead){
		audio.PlayOneShot(hitSound);
		renderer.material.color.g = 0.25;
		renderer.material.color.b = 0.25;
		checkHealth();
	}
	if(other.collider.tag == "heart"){
		Destroy(other.gameObject);
		addHealth();
	}
}

//Получение урона
function checkHealth () {
	health -= 1;
	updateHearts();
	// Умерли
	if(health <= 0 && !dead){
		dead = true;
		renderer.enabled = false;
		rigidbody.isKinematic = true;
		collider.enabled = false;
		Instantiate(deathAnim, transform.position, Quaternion.Euler(0,180,0));
		var controls = gameObject.GetComponent(playercontrols);
		var weapons = gameObject.GetComponent(playerweapons);
		controls.enabled = false;
		weapons.enabled = false;
		yield WaitForSeconds(3);
		var lvlName:String = Application.loadedLevelName;
		Application.LoadLevel(lvlName);
	}
}

//Прибавление жизни
function addHealth () {
	audio.PlayOneShot(heartSound);
	health += 2;
	if(health > 6)	health = 6;
	updateHearts();
}

function updateHearts () {
	//Отрисовка сердец жизней
	switch(health){
		case 6:
			heart1.texture = heartWhole;
			heart2.texture = heartWhole;
			heart3.texture = heartWhole;
			break;
		case 5:
			heart1.texture = heartWhole;
			heart2.texture = heartWhole;
			heart3.texture = heartHalf;
			break;
		case 4:
			heart1.texture = heartWhole;
			heart2.texture = heartWhole;
			heart3.texture = heartEmpty;
			break;
		case 3:
			heart1.texture = heartWhole;
			heart2.texture = heartHalf;
			heart3.texture = heartEmpty;
			break;
		case 2:
			heart1.texture = heartWhole;
			heart2.texture = heartEmpty;
			heart3.texture = heartEmpty;
			break;
		case 1:
			heart1.texture = heartHalf;
			heart2.texture = heartEmpty;
			heart3.texture = heartEmpty;
			break;
		default:
			heart1.texture = heartEmpty;
			heart2.texture = heartEmpty;
			heart3.texture = heartEmpty;
	}	
}
