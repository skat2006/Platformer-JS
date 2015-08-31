#pragma strict

var hurtSound:AudioClip;
var left1:Texture;
var left2:Texture;
var right1:Texture;
var right2:Texture;
var deathAnim:GameObject;
var heartDrop:GameObject;
var health:int = 4;
var jumpSpeed:float = 2.0;

private var counter:float = 0.0;
private var colorCounter:float = 0.0;
private var target:GameObject;
private var direction = false;
private var distance:float = 0.0;
private var ydistance:float = 0.0;
private var frameRate:float = 6.0;

//Находим игрока
function Start () {
	target = GameObject.Find("player");
}

function Update () {
	//Вычисление расстояния летающего врага до игрока
	distance = target.transform.position.x - transform.position.x;
	ydistance = target.transform.position.y - transform.position.y;
	if(distance < 0){
		distance *= -1;
	}
	if(ydistance < 0){
		ydistance*= -1;
	}
	//Вычисление направления
	if(target.transform.position.x > transform.position.x){
		direction = true;
	}
	if(target.transform.position.x < transform.position.x){
		direction = false;
	}

//Если игрок достаточно близко - двигаемся
	if(distance < 16 && ydistance < 8){
		counter += Time.deltaTime*frameRate;
		if(direction){
			if(counter > 0 && renderer.material.mainTexture != right1) renderer.material.mainTexture = right1;
			if(counter > 1 && renderer.material.mainTexture != right2) renderer.material.mainTexture = right2;
			if(counter > 2) counter = 0.0;
		} else {
			if(counter > 0 && renderer.material.mainTexture != left1) renderer.material.mainTexture = left1;
			if(counter > 1 && renderer.material.mainTexture != left2) renderer.material.mainTexture = left2;
			if(counter > 2) counter = 0.0;
		}

		if(target != null){
			var dir = target.transform.position - transform.position;
			dir = dir.normalized;
			rigidbody.AddForce(dir * 800 * Time.deltaTime);
		}
	}

	//Изменение цвета при попадании
	if(renderer.material.color.r == 0.5){
		colorCounter += Time.deltaTime;
		if(colorCounter > 0.125){
			renderer.material.color.r = 1;
			renderer.material.color.b = 1; 
		}
	}
}

//Контроль здоровья противника
function OnTriggerEnter (other : Collider){
	if(other.tag == "bullet"){
		audio.PlayOneShot(hurtSound);
		Destroy(other.gameObject);
		renderer.material.color.r = 0.5;
		renderer.material.color.b = 0.5; 
		colorCounter = 0.0;
		health -= 1;
		if(health <= 0){ // Здоровье <0? играем анимацию смерти и уничтожаем
			Instantiate(deathAnim, transform.position, Quaternion.Euler(0,180,0));
			var randNum:int = Random.Range(1,4);
			if(randNum == 2){
				Instantiate(heartDrop, transform.position, Quaternion.Euler(0,180,0));
			}
			Destroy(gameObject);
		}
	}
}
