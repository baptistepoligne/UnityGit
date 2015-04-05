private var motor : CharacterMotor;
public var isPlayer : boolean = true;
public var avant : KeyCode = KeyCode.Z;
public var arriere : KeyCode = KeyCode.S;
public var droite : KeyCode = KeyCode.D;
public var gauche : KeyCode = KeyCode.Q;
private var walking : boolean;
private var animator : Animator;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
	walking = false; 
	animator = GetComponentInChildren(Animator);
}

function GetInput() {
	var inputVector : Vector3 = Vector3(0,0,0);
	
	if (Input.GetKey(avant))
		inputVector.x = 1;
	else if (Input.GetKey(arriere))
		inputVector.x = -1;
		
	if (Input.GetKey(droite))
		inputVector.z = 1;
	else if (Input.GetKey(gauche))
		inputVector.z = -1;
		
	return inputVector;
}

// Update is called once per frame
function Update () {
	var directionVector = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));

	// Get the input vector from keyboard or analog stick
	if (!isPlayer)
	{
		directionVector = GetInput();
		
		Debug.Log(directionVector);
	}
	
	else 
	{
		if (directionVector == Vector3.zero && walking)
		{
			walking = false;
			animator.SetBool ("walking",walking);
		}
		else if (directionVector != Vector3.zero && !walking)
		{
			walking = true;
			animator.SetBool ("walking",walking);
		
		}
	
	}
	
	
	
	if (directionVector != Vector3.zero) {
		// Get the length of the directon vector and then normalize it
		// Dividing by the length is cheaper than normalizing when we already have the length anyway
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		
		// Make sure the length is no bigger than 1
		directionLength = Mathf.Min(1, directionLength);
		
		// Make the input vector more sensitive towards the extremes and less sensitive in the middle
		// This makes it easier to control slow speeds when using analog sticks
		directionLength = directionLength * directionLength;
		
		// Multiply the normalized direction vector by the modified length
		directionVector = directionVector * directionLength;
	}
	
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = transform.rotation * directionVector;
	motor.inputJump = Input.GetButton("Jump");
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
	@script AddComponentMenu ("Character/FPS Input Controller")