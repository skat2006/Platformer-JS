#pragma strict

var idleLeft:Texture;
var idleRight:Texture;
var left1:Texture;
var left2:Texture;
var right1:Texture;
var right2:Texture;
var fireLeft:Texture;
var fireRight:Texture;

private var counter:float = 0.0;
private var frameRate:float = 8;
private var direction = true;
private var hit:RaycastHit;

function Update () {
	counter += Time.deltaTime*frameRate;

	if(rigidbody.velocity.x > 0.25 && !direction) direction = true;
	if(rigidbody.velocity.x < -0.25 && direction) direction = false;

	//Стоим или прыгаем
	if((rigidbody.velocity.x < 0.25 && rigidbody.velocity.x > -0.25 && rigidbody.velocity.y < 0.25 && rigidbody.velocity.y > -0.25)||(rigidbody.velocity.y > 2)||(rigidbody.velocity.y < -2)){
		if(renderer.material.mainTexture != idleRight && direction){
			renderer.material.mainTexture = idleRight;
		}
		if(renderer.material.mainTexture != idleLeft && !direction){
			renderer.material.mainTexture = idleLeft;
		}
	}

	//На земле?
	if (Physics.Raycast (transform.position - Vector3(0,0.25,0), Vector3(0,-1,0), hit)) {
		if(hit.distance < 0.74){
			if(rigidbody.velocity.x > 0.25 && rigidbody.velocity.y > -2 && rigidbody.velocity.y < 2){
				if(counter > 0 && renderer.material.mainTexture != right1){
					renderer.material.mainTexture = right1;
				}
				if(counter > 1 && renderer.material.mainTexture != right2){
					renderer.material.mainTexture = right2;
				}
				if(counter > 2)	counter = 0.0;
			}

			if(rigidbody.velocity.x < -0.25 && rigidbody.velocity.y > -2 && rigidbody.velocity.y < 2){
				if(counter > 0 && renderer.material.mainTexture != left1){
					renderer.material.mainTexture = left1;
				}
				if(counter > 1 && renderer.material.mainTexture != left2){
					renderer.material.mainTexture = left2;
				}
				if(counter > 2)	counter = 0.0;
			}
		}
	}
}
