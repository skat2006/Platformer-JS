#pragma strict

var bullet1:GameObject;
var bulletSpeed:float = 20;
var bulletSound:AudioClip;

//Пули
private var bulletCounter:float = 0.0;
private var bulletPos:float = 0.0;
private var direction = true;
private var weaponSet:float = 0.0;
private var currentBullet:GameObject;
private var fireRate:float = 0.25;

function Start () {
	currentBullet = bullet1;
}

function Update () {
	//Контроль времени для стрельбы
	bulletCounter += Time.deltaTime;

	//Выбор направления стрельбы
	if(Input.GetKey("d") || Input.GetKey("right")) direction = true;
	if(Input.GetKey("a") || Input.GetKey("left")) direction = false;
	if(direction && bulletPos != 0.5) bulletPos = 0.5;
	if(!direction && bulletPos != -0.5) bulletPos = -0.5;

	//Web или PC версия
	#if UNITY_WEBPLAYER || UNITY_STANDALONE
	if(Input.GetKey(KeyCode.LeftShift)) SpawnBullet();
	#endif

	//Android или iOS версия
	#if UNITY_ANDROID || UNITY_WEBPLAYER
	if(Input.touchCount > 0){
		for(var touch1 : Touch in Input.touches) { 
			if(touch1.position.x > Screen.width/2 && touch1.position.x < Screen.width/4*3 && touch1.position.y < Screen.height/3){
				SpawnBullet();
			}
		}
	}
	#endif
}

function SpawnBullet() {
	if(bulletCounter > fireRate){
		var bulletPrefab = Instantiate(currentBullet, transform.position + Vector3(bulletPos,-0.25,0.01), Quaternion.Euler(0,180,0));
		audio.PlayOneShot(bulletSound);
		bulletPrefab.transform.rigidbody.velocity.x = direction ? bulletSpeed : -bulletSpeed;
		bulletCounter = 0.0;
	}
}
