# Dark Sky Alexa Skill

This is a skill built for Amazon's Alexa service that queries the current forecast from the [Dark
Sky API](https://developer.forecast.io). It allows you to ask Alexa the following:

> Alexa, ask Dark Sky what it's like outside in Brooklyn

> Alexa, ask Dark Sky what the weather's like in Chicago right now

> Alexa, ask Dark Sky what the conditions are in Los Angeles for the hour

> Alexa, ask Dark Sky what the forecast in San Francisco is this week

If you're just getting started developing skills for Alexa, I'd recommend reading [Getting Started
with the Alexa Skills
Kit](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/getting-started-guide) and
[Developing an Alexa Skill as a Lambda
Function](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function) to get familiar with the process.

## Testing The Skill Locally

You'll need to register for a developer account with the [Dark Sky](https://developer.forecast.io)
folks and get an API key. Once you do that, open up `.env` and add your API key in the first line of
that file.

You can use [node-lambda](https://github.com/motdotla/node-lambda) to test this skill locally. In
the `test_events` directory are several event files you can use for testing, and they should map
pretty well to each Intent. To test an intent, simply copy the contents of one of the json files in
that directory and overwrite the contents of `event.json`. Then run `node-lambda run` from the
command line.

## Setting up the Skill

To set up the skill, head on over to [Alexa skills kit
development console](https://developer.amazon.com/edw/home.html) and add a new skill. Fill in the
basic skill information however you choose. For Endpoint, you'll need to fill in your Lambda ARN
which you'll get in the next step. Next, head on over to Interaction Model. In the Intent
Schema field, copy and paste the contents of the `interaction_model/intent_schema.json` file. Then
in the Sample Utterances field, copy and paste the contents of
`interaction_model/sample_utterances.txt`. Finally, add a new Slot Type, again copying and pasting
the contents from `interaction_model/map_type_slot.txt` file (the first line is the title, the rest
are the values).

## Hosting the Skill

The skill is built to be easily hosted on Amazon's [AWS
Lambda service](https://aws.amazon.com/lambda/). Create your Lambda function (using the
alexa-skills-kit-color-expert blueprint) and make sure you choose Node.js as the runtime. After
you've created your Lambda function, look at the top right of the page to get your Lambda ARN
number and put that in the Alexa Skill Information Endpoint field.

To deploy to Lambda, first makes sure you do an `npm install` at the root of the project.
Once all the dependencies are installed, run `npm run bundle`, which will create a lambda.zip file.
You can then upload that zip file to Lambda for use in your function and skill.

You can also use [node-lambda](https://github.com/motdotla/node-lambda) to deploy to your Lambda
function directly from the command line. Simply add a deploy.env file with your environment
configuration (and double check the supplied .env file in this repository) and then run
`node-lambda deploy`. Please visit the [node-lambda](https://github.com/motdotla/node-lambda)
project page for more information on deploying from the command line.
