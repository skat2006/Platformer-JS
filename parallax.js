#pragma strict

//Parallax

private var target:GameObject;
public var scale:float = 3f;

function Start () {
	target = GameObject.Find("Main Camera");
}

function Update () {
	transform.position.y = target.transform.position.y/scale;
	transform.position.x = target.transform.position.x/scale;
}
