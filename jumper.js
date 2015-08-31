#pragma strict

var hurtSound:AudioClip;
var jumpLeft1:Texture;
var jumpLeft2:Texture;
var jumpRight1:Texture;
var jumpRight2:Texture;
var deathAnim:GameObject;
var heartDrop:GameObject;
var health:int = 6;
var jumpSpeed:float = 2.0;

private var counter:float = 0.0;
private var colorCounter:float = 0.0;
private var target:GameObject;
private var direction = false;
private var touched = true;
private var distance:float = 0.0;
private var ydistance:float = 0.0;
private var playerDist:float = 0.0;


function Start () {
	//Задание цели. Простой AI.
	target = GameObject.Find("player");
	//Игнорирование подобных
	var enemies = GameObject.FindGameObjectsWithTag("enemy");
	for (var en : GameObject in enemies)  {
		if (en.collider != collider) {
			Physics.IgnoreCollision(collider, en.collider);
		}
	}
}

function Update () {
	//Проверка расстояния до цели
	distance = target.transform.position.x - transform.position.x;
	ydistance = target.transform.position.y - transform.position.y;
	if(distance < 0) distance *= -1;
	if(ydistance < 0) ydistance*= -1;

	//Допускает ли расстояние нападение?
	if(distance < 16 && ydistance < 8){
		counter += Time.deltaTime;
		if(counter < jumpSpeed && touched == true){
			if(target.transform.position.x < transform.position.x && renderer.material.mainTexture != jumpLeft1){
				renderer.material.mainTexture = jumpLeft1;
				direction = false;
			}
			if(target.transform.position.x > transform.position.x && renderer.material.mainTexture != jumpRight1){
				renderer.material.mainTexture = jumpRight1;
				direction = true;
			}
		}
		//Нападение
		if(counter > jumpSpeed){
			playerDist = target.transform.position.x-transform.position.x;
			counter = 0.0;
			touched = false;
			if(direction) renderer.material.mainTexture = jumpRight2;
			if(!direction) renderer.material.mainTexture = jumpLeft2;
			rigidbody.velocity.y = 19;
		}
	}

	//Двигаемся к противнику
	if(rigidbody.velocity.y > 0.5){
		rigidbody.velocity.x = playerDist*1.5;
	}

	//Дотронулись до объекта - стоп
	if(touched == true){
		rigidbody.velocity.x = 0.0;
	}

	//Изменение цвета при повреждении
	if(renderer.material.color.r == 0.5){
		colorCounter += Time.deltaTime;
		if(colorCounter > 0.125){
			renderer.material.color.r = 1;
			renderer.material.color.b = 1; 
		}
	}

	//Уничтожение при падении
	if(transform.position.y < -10){
		Destroy(gameObject);
	}
}

function OnCollisionEnter (other : Collision){
	if(rigidbody.velocity.y >= 0){
		rigidbody.velocity = Vector3(0,0,0);
		if(counter > 3 && direction) renderer.material.mainTexture = jumpRight1;
		if(counter > 3 && !direction) renderer.material.mainTexture = jumpLeft1;
		touched = true;
	}
}

//Контроль здоровья
function OnTriggerEnter (other : Collider){
	if(other.tag == "bullet"){
		audio.PlayOneShot(hurtSound);
		Destroy(other.gameObject);
		renderer.material.color.r = 0.5;
		renderer.material.color.b = 0.5; 
		colorCounter = 0.0;
		health -= 1;
		if(health <= 0){
			Instantiate(deathAnim, transform.position, Quaternion.Euler(0,180,0));
			var randNum:int = Random.Range(1,4);
			if(randNum == 2) Instantiate(heartDrop, transform.position, Quaternion.Euler(0,180,0));
			Destroy(gameObject);
		}
	}
}
