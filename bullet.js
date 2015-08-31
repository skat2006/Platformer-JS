#pragma strict
//Контроль времени полета пули
private var lifeCounter:float = 0.0;

function Update () {
//Подсчет времени, >1 сек. - уничтожаем пулю
	lifeCounter += Time.deltaTime;
	if(lifeCounter > 1){
		Destroy(gameObject);
	}
}
