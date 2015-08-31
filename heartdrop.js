#pragma strict

//Придание не большого ускорения
function Start () {
	rigidbody.velocity = Vector3(Random.Range(-6,6),Random.Range(4,8),0);
}
