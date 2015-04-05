using UnityEngine;
using System.Collections;

public class watergravity : MonoBehaviour {
	
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
	}
	
	void Update () {
		if (transform.position.y < underwaterLevel)
		{

			axel.movement.gravity = -4f;
			

		}
		else
		{

			axel.movement.gravity = 4;
		}
	}
}