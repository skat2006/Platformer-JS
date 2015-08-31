#pragma strict

var walkSpeed:float = 14.0;
var jumpHeight:float = 8.0;
var fallLimit:float = -10;
var jumpSound:AudioClip;

private var hit:RaycastHit;
private var jumpCounter:float = 0.0;

function Update () {
	jumpCounter += Time.deltaTime;

	#if UNITY_WEBPLAYER || UNITY_STANDALONE
	if(Input.GetKey("a") || Input.GetKey("left")){
		if(rigidbody.velocity.x > 0) rigidbody.velocity.x = 0;
		if(rigidbody.velocity.x > -walkSpeed) rigidbody.velocity.x -= 48*Time.deltaTime;
	} else if(Input.GetKey("d")|| Input.GetKey("right")) {
		if(rigidbody.velocity.x < 0) rigidbody.velocity.x = 0;
		if(rigidbody.velocity.x < walkSpeed) rigidbody.velocity.x += 48*Time.deltaTime;
	} else {
		rigidbody.velocity.x = 0.0;
	}

	//Можно прыгать?
	if (Physics.Raycast (transform.position - Vector3(0,0.25,0), Vector3(0,-1,0), hit)) {
		if(hit.distance < 0.74 && Input.GetKey("space") && hit.transform.tag != "spikes" && hit.transform.tag != "enemy"){
			rigidbody.velocity.y = jumpHeight;
			if(jumpCounter > 0.25){
				audio.PlayOneShot(jumpSound);
				jumpCounter = 0.0;
			}
		}
	}
	#endif

	#if UNITY_IOS || UNITY_ANDROID
	if(Input.touchCount > 0){
		for(var touch1 : Touch in Input.touches) {
			if(touch1.position.x < Screen.width/5 && touch1.position.y < Screen.height/3){
				if(rigidbody.velocity.x > 0) rigidbody.velocity.x = 0;
				if(rigidbody.velocity.x > -walkSpeed) rigidbody.velocity.x -= 48*Time.deltaTime;
			}
			if(touch1.position.x > Screen.width/5 && touch1.position.x < Screen.width/5*2 && touch1.position.y < Screen.height/3){
				if(rigidbody.velocity.x < 0) rigidbody.velocity.x = 0;
				if(rigidbody.velocity.x < walkSpeed) rigidbody.velocity.x += 48*Time.deltaTime;
			}
			if(Input.touchCount == 1 && touch1.position.x > Screen.width/2){
				rigidbody.velocity.x = 0.0;
			}
		}
	} else {
		rigidbody.velocity.x = 0.0;
	}

	if(Input.touchCount > 0){
		for(var touch2 : Touch in Input.touches) { 
			if(touch2.position.x > Screen.width/4*3 && touch2.position.y < Screen.height/3){
				if(Input.touchCount == 1) rigidbody.velocity.x = 0.0;
				if (Physics.Raycast (transform.position - Vector3(0,0.25,0), Vector3(0,-1,0), hit)) {
					if(hit.distance < 0.74 && hit.transform.tag != "spikes" && hit.transform.tag != "enemy"){
						rigidbody.velocity.y = jumpHeight;
						if(jumpCounter > 0.25){
							audio.PlayOneShot(jumpSound);
							jumpCounter = 0.0;
						}
					}
				}
			}
		}
	}
	#endif

	//Сброс если разбились
	if(transform.position.y < fallLimit){
		var lvlName:String = Application.loadedLevelName;
		Application.LoadLevel(lvlName);
	}
}
