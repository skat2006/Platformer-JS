#pragma strict

//Мобильная платформа или стационарная?

function Start () {
#if UNITY_WEBPLAYER
guiTexture.enabled = false;
#endif
#if UNITY_STANDALONE
guiTexture.enabled = false;
#endif
#if UNITY_IOS
guiTexture.enabled = true;
#endif
#if UNITY_ANDROID
guiTexture.enabled = true;
#endif
}
