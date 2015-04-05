using UnityEngine;
using System.Collections;

public class WaterEffect : MonoBehaviour {
	
	//This script enables underwater effects. Attach to main camera.
	
	//Define variable
	public float underwaterLevel;
	public CharacterMotor axel;
	private float currentGravity;
	//The scene's default fog settings

	void Start () {
		//Set the background color
		//camera.backgroundColor = new Color(0, 0.4f, 0.7f, 1);
		axel = GetComponentInParent<CharacterMotor> ();
		currentGravity = axel.movement.gravity;
		Application.targetFrameRate = 60;
	}
	
	void Update () {
		if (transform.position.y < underwaterLevel)
		{
			RenderSettings.fogColor = new Color(0.06f, 0.19f, 0.12f);
			RenderSettings.fogDensity = 0.9f;
			RenderSettings.fogEndDistance = 100f;
			RenderSettings.fogStartDistance = -200f;
			axel.movement.gravity = -2f;

			if (axel.IsGrounded() == true)
			{ 
				axel.movement.gravity = 4;
			}
		}
		else
		{
			RenderSettings.fogColor = new Color(0.223f, 0.219f, 0.243f);
			RenderSettings.fogDensity = 0.01f;
			RenderSettings.fogEndDistance = 1253.37f;
			RenderSettings.fogStartDistance = -1039;
			axel.movement.gravity = currentGravity;
		}
	}
}