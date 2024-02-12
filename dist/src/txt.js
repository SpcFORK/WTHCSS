// src/WTFCss/src/txt.txt
var txt_default = `No, you didn't read that title wrong.

It is possible to build a neural network in pure CSS. I made a cool demo and everything!

However, training that neural network is next to impossible (with CSS) due to limitations on how many calc() statements you can have that rely on previous ones! So we won't do that here!

Now, the point of this article is not to advocate for building neural networks in CSS (you shouldn't), but instead to introduce you to a couple of CSS tricks I had to use to get this to work!

Read this first
Now, if you haven't already read it, I would recommend reading my previous article (or at least checking out the demo) where I built a neural network in vanilla JS.

The reason being, this is the exact same neural network, but without all the training abilities sadly.

Other than that, let's jump right in!

Show me the money Code!
Here it is:
:root{

    --inputX: 0.9;
    --inputY: -1;
    --output1: 0;
    --output2: 0;
    --output3: 0;
    --output4: 0;

    --output1bias: 0.006412765611663633;
    --output2bias: 0.007072853542676219;
    --output3bias: 0.0064746685639952214;
    --output4bias: 0.004851470988693036;

    --weights1-1: -0.9807254999119579;
    --weights1-2: 0.9813663133332142;
    --weights1-3: -0.9817224902785696;
    --weights1-4: 0.9817919593383302;
    --weights2-1: -0.9809082670731147;
    --weights2-2: -0.9816176935504328;
    --weights2-3: 0.9815336794202348;
    --weights2-4: 0.9815925299039976;


    /* propogate */
    --output1a: calc((var(--weights1-1) * var(--inputX)) + (var(--weights2-1) * var(--inputY)));
    --output2a: calc((var(--weights1-2) * var(--inputX)) + (var(--weights2-2) * var(--inputY)));
    --output3a: calc((var(--weights1-3) * var(--inputX)) + (var(--weights2-3) * var(--inputY)));
    --output4a: calc((var(--weights1-4) * var(--inputX)) + (var(--weights2-4) * var(--inputY)));

    --output1b: calc(max(0, var(--output1a)) + var(--output1bias));  
    --output2b: calc(max(0, var(--output2a)) + var(--output2bias));    
    --output3b: calc(max(0, var(--output3a)) + var(--output3bias));   
    --output4b: calc(max(0, var(--output4a)) + var(--output4bias)); 

    /* categorise */
    --maxOut: max(var(--output1b), var(--output2b), var(--output3b), var(--output4b));

    --output1c: max(calc(1 - ((var(--output1b) - var(--maxOut)) * (var(--output1b) - var(--maxOut)) * 1000000000)), 0);
    --output2c: max(calc(1 - ((var(--output2b) - var(--maxOut)) * (var(--output2b) - var(--maxOut)) * 1000000000)), 0);
    --output3c: max(calc(1 - ((var(--output3b) - var(--maxOut)) * (var(--output3b) - var(--maxOut)) * 1000000000)), 0);
    --output4c: max(calc(1 - ((var(--output4b) - var(--maxOut)) * (var(--output4b) - var(--maxOut)) * 1000000000)), 0);
}
What, were you expecting thousands of lines of CSS? Are you disappointed?

Well fear not, in the next article in this series I will level that up and try and do Optical Character Recognition (OCR) using similar techniques! (might be a few weeks for that one though lol)

But, stick around, there are some interesting things we can learn from pushing CSS to it's limits even with this simple demo!

The Demo
The demo was actually harder to write than the Neural network (as I wanted the demo interface to be pure CSS / HTML too!).

As you select a square in the first section of our pre-trained neural network, it then calculates which quadrant it believes that value was within (shown in the "Neural Network Prediction" section).a

Each of the squares in the first section represents an x, y coordinate that lies between -1 and +1 on each axis. For example, the top left square is -0.8, 0.8 and the bottom right square is 0.8, -0.8.

Finally if you scroll down you will see some values from the neural network to show what is going on "under the hood".

Have a play and then we can have a look at some tricks I had to use to get the demo working!

Note: You may have to scroll up and down to see the inputs vs predictions. It is probably best viewed on PC to minimise scrolling.



A few interesting techniques
OK so first let's start with the neural network itself.

Sigmoid is out, say hello to ReLU!
Our first problem, was that we can't use exp() (exponent) if we want our solution to work on most browsers, as CSS exp() is only supported on FireFox and Safari.

This meant we can't create a sigmoid function for our outputs.

So instead we need another method to replace our sigmoid function.

Luckily there is another popular option here when working with Neural Networks...Rectified Linear Units (ReLUs).

These simply ignore all values less than 0 and only return positive values.

To implement this in CSS is (relatively) straight forward:
 --ReLU: calc(max(0, var(--output)) + var(--outputBias));  
And technically we don't even need calc here (but I always like to include it).

What this does is say "give me the max value of "0" or our output + bias".

If our output + bias is less than 0 then we return 0 (as that is the max number), otherwise we return our output + bias!

Straight forward solution!

Getting a normalised result
There was another big problem to solve here, we need our Neural Network to be able to output it's guess as either a 1 (the guess) or a 0 (not the correct value).

Unfortunately this isn't how Neural Networks work. In fact they output a certainty for all values.

Something like:

x < 0, y < 0: 0.845 <- the highest probability
x > 0, y < 0: 0.283
x < 0, y > 0: 0.154
x > 0, y > 0: 0.319
And we need to turn that into:

x < 0, y < 0: 1 <- highest probability turns into a 1
x > 0, y < 0: 0
x < 0, y > 0: 0
x > 0, y > 0: 0
This is where this trick comes in:
    --maxOut: max(var(--output1b), var(--output2b), var(--output3b), var(--output4b));

    --output1c: max(calc(1 - ((var(--output1b) - var(--maxOut)) * (var(--output1b) - var(--maxOut)) * 1000000000)), 0);
This might look complicated, so let's break it down.

First we need to find the largest value that is outputted by our 4 output neurons.
    --maxOut: max(var(--output1b), var(--output2b), var(--output3b), var(--output4b));
So if our 4 output neurons were 20,11,16,4 then --maxOut would be 20.

Then we use that number to do the following:

subtract the max value from each output.
do this again and multiply them together (this accounts for negative values).
we then multiply this value by 1000000000 just to ensure that rounding is not a problem.
then we subtract this value from "1".
we then take the max value of either the output of that or 0.
This works as if the value is the same as the max value we are essentially doing the following:
  --output1c: 1 - ((20 - 20) * (20 - 20) * 1000000000)
  --output1c: 1 - ((0) * (0) * 1000000000) /* which is 1 - 0 */
  --output1c: max(1 - (0), 0) /* the max is 1 - 0 which is 1 */
However if the value is less than the max value, the following happens (let's say max is 20 and our value is 14):
  --output1c: 1 - ((14 - 20) * (14 - 20) * 1000000000)
  --output1c: 1 - ((-6) * (-6) * 1000000000) /* which is 1 - (36 * 1000000000) */
  --output1c: max(1 - (36000000000), 0) /* the max is 0 as it is greater than 1 - 36000000000 which is -35999999999 */
This solves our categorisation issue!

And that is all we needed to make a neural network (as the rest of the work is just multiplying biases together with inputs that should hopefully be self explanatory if you read my previous article).

Outputting some values
Here is one super useful trick I have not seen people use before.

We can use CSS counter() in order to debug our "application".

You may be wondering why we need this? Well if you try and get the value of a CSS calc expression you will soon run into problems. You will get the string back, not the actual value!
// --example-var: calc(20 * 3)
console.log(window.getComputedStyle(div).getPropertyValue('--example-var'))
// console will output "calc(20 * 3)" instead of 60!
So this is why we can use the counter trick in a pinch!

Now, one thing to note is that counter() in CSS has some limitations. It only allows for integers.

This is a problem as we are dealing with a lot of decimals.

Luckily, as this is only for debugging, we have a workaround.

But before we tackle that, let's show you how you can use CSS counters to grab some values from your CSS.
#input1:after{
    counter-reset: input1 var(--input1);
    position: absolute;
    content: "input 1: " counter(input1);
}
A couple of tricks here. First is that we need to actually output the value, so we use a pseudo element so we can utilise the content property (remember we can't use JS as it will just output the string value).

The second is that we initialise our counter with the value of our CSS variable using counter-reset:.

This means that if our --input1 has a value of 4, then our counter is (re)set to 4 as well.

Now, as I said, counters use integers. This is a problem when we have decimals. The answer is straight forward (although imperfect). We can multiply our decimal by a large value to make it an integer.
counter-reset: output1 calc(var(--output1b) * 100000);
This quick hack moves our decimal place 6 positions to the right.

As I said, it is ugly (and we could probably do some fancy tricks to get our decimal place...that might be a future fun experiment!) but it does give us some outputs.

This is the technique used for the whole of the third section of the demo, if you are wondering how I outputted text there.

Important note: Unfortunately content: values are not exposed to assistive technology. And this is the main reason why "CSS only" is for nothing more than fun most of the time.

Do not use this trick in production, just save it for debugging when other methods fail.

Anyway, that is the hack, I hope that one day it will help you out!

Tricks for the demo itself
I wanted the demo itself to also be CSS only. So to achieve this there are two tricks here.

The input grid
The first is the input "grid" we have created.

Because we only want one value to be selected at a time (our x and y coordinates) I used a <input type="radio"> and then laid it out in a grid shape using floats and clears!

But the main trick was that I wanted to still make this keyboard accessible, so I used a trick where I visually hide the input and then adjust the label appearance based on state.

We then use the labels themselves in order to create our grid shape.
/* our label is the actual grid square */
label{
    --wh: min(10vw, 60px);
    width: var(--wh);
    height: var(--wh);
    display: block;
    background-color: #bb0000;
    float: left;
    text-align: center;
    font-size: 0.2vw;
    outline: 1px solid #666;
}

input[type="radio"]{
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

input:checked + label{
    background-color: #00ff00;
    outline: 4px solid #000;
    outline-offset: -4px;
}

input:focus + label{
    outline: 8px solid #333;
    outline-offset: -8px;
    border-radius: 16px;
}


To achieve this we use the + operator. This grabs the next sibling (item on the same "level") that matches that selector.

So by grabbing input:checked and then finding the next label to that input with the + operator, we are able to use our labels as the items we display, instead of the radio inputs themselves, all while making the radio inputs still accessible.

Now, speaking of the radio inputs, I did mention that we need to visually hide them!
input[type="radio"]{
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
The CSS above means that the input is still accessible to assistive technology and still focusable, but it does not take up a single pixel visually.

Combining this with the previous trick we can create a grid of radio inputs!

The output grid
Ahhh the final trick here.

If you remember earlier we created a way to make our neural network output a 1 or a 0.

But how do we turn that into a "red" and "green" for each of the 4 quadrants depending on the output?

This is where we can use a neat trick with linear gradients and opacity for our fill and outline respectively!
--color1: #00ff00;
--color2: #990000;
--switch1: var(--color1) calc(100% * var(--output1c)), 
                 var(--color2) 0;
--switch1outline: rgba(0,0,0, calc(100% * var(--output1c)));
For our --switch1, we want the square to either be colour red (if the value is 0) or coloured green (if the value is 1).

By toggling the percentage of our first colour between either 100% (cover the square) or 0% (our secondary colour will take over) we get a neat way of toggling the colour.

We use a similar technique on our outline, adjusting the alpha value (transparency) to either 100% (visible) or to 0% (invisible).

By applying these styles to each of the 4 squares that make up our output grid as follows:
#out-x-1y-1{
    background: linear-gradient(var(--switch1));
    outline: 4px solid var(--switch1outline);
    outline-offset: -4px;
}
Then depending on which grid square has an output of "1" we either get a dark red square or a bright green square with a dark outline.

// --- 

Today we will make a ECMA module for generating crazy CSS like this, because CSS is quick, and has an update loop build in. we will make components and generators/factories in order to make shorthands that can be compiled into a CSS string, and then added to the DOM.`;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL1dURkNzcy9zcmMvdHh0LnR4dCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiTm8sIHlvdSBkaWRuJ3QgcmVhZCB0aGF0IHRpdGxlIHdyb25nLlxuXG5JdCBpcyBwb3NzaWJsZSB0byBidWlsZCBhIG5ldXJhbCBuZXR3b3JrIGluIHB1cmUgQ1NTLiBJIG1hZGUgYSBjb29sIGRlbW8gYW5kIGV2ZXJ5dGhpbmchXG5cbkhvd2V2ZXIsIHRyYWluaW5nIHRoYXQgbmV1cmFsIG5ldHdvcmsgaXMgbmV4dCB0byBpbXBvc3NpYmxlICh3aXRoIENTUykgZHVlIHRvIGxpbWl0YXRpb25zIG9uIGhvdyBtYW55IGNhbGMoKSBzdGF0ZW1lbnRzIHlvdSBjYW4gaGF2ZSB0aGF0IHJlbHkgb24gcHJldmlvdXMgb25lcyEgU28gd2Ugd29uJ3QgZG8gdGhhdCBoZXJlIVxuXG5Ob3csIHRoZSBwb2ludCBvZiB0aGlzIGFydGljbGUgaXMgbm90IHRvIGFkdm9jYXRlIGZvciBidWlsZGluZyBuZXVyYWwgbmV0d29ya3MgaW4gQ1NTICh5b3Ugc2hvdWxkbid0KSwgYnV0IGluc3RlYWQgdG8gaW50cm9kdWNlIHlvdSB0byBhIGNvdXBsZSBvZiBDU1MgdHJpY2tzIEkgaGFkIHRvIHVzZSB0byBnZXQgdGhpcyB0byB3b3JrIVxuXG5SZWFkIHRoaXMgZmlyc3Rcbk5vdywgaWYgeW91IGhhdmVuJ3QgYWxyZWFkeSByZWFkIGl0LCBJIHdvdWxkIHJlY29tbWVuZCByZWFkaW5nIG15IHByZXZpb3VzIGFydGljbGUgKG9yIGF0IGxlYXN0IGNoZWNraW5nIG91dCB0aGUgZGVtbykgd2hlcmUgSSBidWlsdCBhIG5ldXJhbCBuZXR3b3JrIGluIHZhbmlsbGEgSlMuXG5cblRoZSByZWFzb24gYmVpbmcsIHRoaXMgaXMgdGhlIGV4YWN0IHNhbWUgbmV1cmFsIG5ldHdvcmssIGJ1dCB3aXRob3V0IGFsbCB0aGUgdHJhaW5pbmcgYWJpbGl0aWVzIHNhZGx5LlxuXG5PdGhlciB0aGFuIHRoYXQsIGxldCdzIGp1bXAgcmlnaHQgaW4hXG5cblNob3cgbWUgdGhlIG1vbmV5IENvZGUhXG5IZXJlIGl0IGlzOlxuOnJvb3R7XG5cbiAgICAtLWlucHV0WDogMC45O1xuICAgIC0taW5wdXRZOiAtMTtcbiAgICAtLW91dHB1dDE6IDA7XG4gICAgLS1vdXRwdXQyOiAwO1xuICAgIC0tb3V0cHV0MzogMDtcbiAgICAtLW91dHB1dDQ6IDA7XG5cbiAgICAtLW91dHB1dDFiaWFzOiAwLjAwNjQxMjc2NTYxMTY2MzYzMztcbiAgICAtLW91dHB1dDJiaWFzOiAwLjAwNzA3Mjg1MzU0MjY3NjIxOTtcbiAgICAtLW91dHB1dDNiaWFzOiAwLjAwNjQ3NDY2ODU2Mzk5NTIyMTQ7XG4gICAgLS1vdXRwdXQ0YmlhczogMC4wMDQ4NTE0NzA5ODg2OTMwMzY7XG5cbiAgICAtLXdlaWdodHMxLTE6IC0wLjk4MDcyNTQ5OTkxMTk1Nzk7XG4gICAgLS13ZWlnaHRzMS0yOiAwLjk4MTM2NjMxMzMzMzIxNDI7XG4gICAgLS13ZWlnaHRzMS0zOiAtMC45ODE3MjI0OTAyNzg1Njk2O1xuICAgIC0td2VpZ2h0czEtNDogMC45ODE3OTE5NTkzMzgzMzAyO1xuICAgIC0td2VpZ2h0czItMTogLTAuOTgwOTA4MjY3MDczMTE0NztcbiAgICAtLXdlaWdodHMyLTI6IC0wLjk4MTYxNzY5MzU1MDQzMjg7XG4gICAgLS13ZWlnaHRzMi0zOiAwLjk4MTUzMzY3OTQyMDIzNDg7XG4gICAgLS13ZWlnaHRzMi00OiAwLjk4MTU5MjUyOTkwMzk5NzY7XG5cblxuICAgIC8qIHByb3BvZ2F0ZSAqL1xuICAgIC0tb3V0cHV0MWE6IGNhbGMoKHZhcigtLXdlaWdodHMxLTEpICogdmFyKC0taW5wdXRYKSkgKyAodmFyKC0td2VpZ2h0czItMSkgKiB2YXIoLS1pbnB1dFkpKSk7XG4gICAgLS1vdXRwdXQyYTogY2FsYygodmFyKC0td2VpZ2h0czEtMikgKiB2YXIoLS1pbnB1dFgpKSArICh2YXIoLS13ZWlnaHRzMi0yKSAqIHZhcigtLWlucHV0WSkpKTtcbiAgICAtLW91dHB1dDNhOiBjYWxjKCh2YXIoLS13ZWlnaHRzMS0zKSAqIHZhcigtLWlucHV0WCkpICsgKHZhcigtLXdlaWdodHMyLTMpICogdmFyKC0taW5wdXRZKSkpO1xuICAgIC0tb3V0cHV0NGE6IGNhbGMoKHZhcigtLXdlaWdodHMxLTQpICogdmFyKC0taW5wdXRYKSkgKyAodmFyKC0td2VpZ2h0czItNCkgKiB2YXIoLS1pbnB1dFkpKSk7XG5cbiAgICAtLW91dHB1dDFiOiBjYWxjKG1heCgwLCB2YXIoLS1vdXRwdXQxYSkpICsgdmFyKC0tb3V0cHV0MWJpYXMpKTsgIFxuICAgIC0tb3V0cHV0MmI6IGNhbGMobWF4KDAsIHZhcigtLW91dHB1dDJhKSkgKyB2YXIoLS1vdXRwdXQyYmlhcykpOyAgICBcbiAgICAtLW91dHB1dDNiOiBjYWxjKG1heCgwLCB2YXIoLS1vdXRwdXQzYSkpICsgdmFyKC0tb3V0cHV0M2JpYXMpKTsgICBcbiAgICAtLW91dHB1dDRiOiBjYWxjKG1heCgwLCB2YXIoLS1vdXRwdXQ0YSkpICsgdmFyKC0tb3V0cHV0NGJpYXMpKTsgXG5cbiAgICAvKiBjYXRlZ29yaXNlICovXG4gICAgLS1tYXhPdXQ6IG1heCh2YXIoLS1vdXRwdXQxYiksIHZhcigtLW91dHB1dDJiKSwgdmFyKC0tb3V0cHV0M2IpLCB2YXIoLS1vdXRwdXQ0YikpO1xuXG4gICAgLS1vdXRwdXQxYzogbWF4KGNhbGMoMSAtICgodmFyKC0tb3V0cHV0MWIpIC0gdmFyKC0tbWF4T3V0KSkgKiAodmFyKC0tb3V0cHV0MWIpIC0gdmFyKC0tbWF4T3V0KSkgKiAxMDAwMDAwMDAwKSksIDApO1xuICAgIC0tb3V0cHV0MmM6IG1heChjYWxjKDEgLSAoKHZhcigtLW91dHB1dDJiKSAtIHZhcigtLW1heE91dCkpICogKHZhcigtLW91dHB1dDJiKSAtIHZhcigtLW1heE91dCkpICogMTAwMDAwMDAwMCkpLCAwKTtcbiAgICAtLW91dHB1dDNjOiBtYXgoY2FsYygxIC0gKCh2YXIoLS1vdXRwdXQzYikgLSB2YXIoLS1tYXhPdXQpKSAqICh2YXIoLS1vdXRwdXQzYikgLSB2YXIoLS1tYXhPdXQpKSAqIDEwMDAwMDAwMDApKSwgMCk7XG4gICAgLS1vdXRwdXQ0YzogbWF4KGNhbGMoMSAtICgodmFyKC0tb3V0cHV0NGIpIC0gdmFyKC0tbWF4T3V0KSkgKiAodmFyKC0tb3V0cHV0NGIpIC0gdmFyKC0tbWF4T3V0KSkgKiAxMDAwMDAwMDAwKSksIDApO1xufVxuV2hhdCwgd2VyZSB5b3UgZXhwZWN0aW5nIHRob3VzYW5kcyBvZiBsaW5lcyBvZiBDU1M/IEFyZSB5b3UgZGlzYXBwb2ludGVkP1xuXG5XZWxsIGZlYXIgbm90LCBpbiB0aGUgbmV4dCBhcnRpY2xlIGluIHRoaXMgc2VyaWVzIEkgd2lsbCBsZXZlbCB0aGF0IHVwIGFuZCB0cnkgYW5kIGRvIE9wdGljYWwgQ2hhcmFjdGVyIFJlY29nbml0aW9uIChPQ1IpIHVzaW5nIHNpbWlsYXIgdGVjaG5pcXVlcyEgKG1pZ2h0IGJlIGEgZmV3IHdlZWtzIGZvciB0aGF0IG9uZSB0aG91Z2ggbG9sKVxuXG5CdXQsIHN0aWNrIGFyb3VuZCwgdGhlcmUgYXJlIHNvbWUgaW50ZXJlc3RpbmcgdGhpbmdzIHdlIGNhbiBsZWFybiBmcm9tIHB1c2hpbmcgQ1NTIHRvIGl0J3MgbGltaXRzIGV2ZW4gd2l0aCB0aGlzIHNpbXBsZSBkZW1vIVxuXG5UaGUgRGVtb1xuVGhlIGRlbW8gd2FzIGFjdHVhbGx5IGhhcmRlciB0byB3cml0ZSB0aGFuIHRoZSBOZXVyYWwgbmV0d29yayAoYXMgSSB3YW50ZWQgdGhlIGRlbW8gaW50ZXJmYWNlIHRvIGJlIHB1cmUgQ1NTIC8gSFRNTCB0b28hKS5cblxuQXMgeW91IHNlbGVjdCBhIHNxdWFyZSBpbiB0aGUgZmlyc3Qgc2VjdGlvbiBvZiBvdXIgcHJlLXRyYWluZWQgbmV1cmFsIG5ldHdvcmssIGl0IHRoZW4gY2FsY3VsYXRlcyB3aGljaCBxdWFkcmFudCBpdCBiZWxpZXZlcyB0aGF0IHZhbHVlIHdhcyB3aXRoaW4gKHNob3duIGluIHRoZSBcIk5ldXJhbCBOZXR3b3JrIFByZWRpY3Rpb25cIiBzZWN0aW9uKS5hXG5cbkVhY2ggb2YgdGhlIHNxdWFyZXMgaW4gdGhlIGZpcnN0IHNlY3Rpb24gcmVwcmVzZW50cyBhbiB4LCB5IGNvb3JkaW5hdGUgdGhhdCBsaWVzIGJldHdlZW4gLTEgYW5kICsxIG9uIGVhY2ggYXhpcy4gRm9yIGV4YW1wbGUsIHRoZSB0b3AgbGVmdCBzcXVhcmUgaXMgLTAuOCwgMC44IGFuZCB0aGUgYm90dG9tIHJpZ2h0IHNxdWFyZSBpcyAwLjgsIC0wLjguXG5cbkZpbmFsbHkgaWYgeW91IHNjcm9sbCBkb3duIHlvdSB3aWxsIHNlZSBzb21lIHZhbHVlcyBmcm9tIHRoZSBuZXVyYWwgbmV0d29yayB0byBzaG93IHdoYXQgaXMgZ29pbmcgb24gXCJ1bmRlciB0aGUgaG9vZFwiLlxuXG5IYXZlIGEgcGxheSBhbmQgdGhlbiB3ZSBjYW4gaGF2ZSBhIGxvb2sgYXQgc29tZSB0cmlja3MgSSBoYWQgdG8gdXNlIHRvIGdldCB0aGUgZGVtbyB3b3JraW5nIVxuXG5Ob3RlOiBZb3UgbWF5IGhhdmUgdG8gc2Nyb2xsIHVwIGFuZCBkb3duIHRvIHNlZSB0aGUgaW5wdXRzIHZzIHByZWRpY3Rpb25zLiBJdCBpcyBwcm9iYWJseSBiZXN0IHZpZXdlZCBvbiBQQyB0byBtaW5pbWlzZSBzY3JvbGxpbmcuXG5cblxuXG5BIGZldyBpbnRlcmVzdGluZyB0ZWNobmlxdWVzXG5PSyBzbyBmaXJzdCBsZXQncyBzdGFydCB3aXRoIHRoZSBuZXVyYWwgbmV0d29yayBpdHNlbGYuXG5cblNpZ21vaWQgaXMgb3V0LCBzYXkgaGVsbG8gdG8gUmVMVSFcbk91ciBmaXJzdCBwcm9ibGVtLCB3YXMgdGhhdCB3ZSBjYW4ndCB1c2UgZXhwKCkgKGV4cG9uZW50KSBpZiB3ZSB3YW50IG91ciBzb2x1dGlvbiB0byB3b3JrIG9uIG1vc3QgYnJvd3NlcnMsIGFzIENTUyBleHAoKSBpcyBvbmx5IHN1cHBvcnRlZCBvbiBGaXJlRm94IGFuZCBTYWZhcmkuXG5cblRoaXMgbWVhbnQgd2UgY2FuJ3QgY3JlYXRlIGEgc2lnbW9pZCBmdW5jdGlvbiBmb3Igb3VyIG91dHB1dHMuXG5cblNvIGluc3RlYWQgd2UgbmVlZCBhbm90aGVyIG1ldGhvZCB0byByZXBsYWNlIG91ciBzaWdtb2lkIGZ1bmN0aW9uLlxuXG5MdWNraWx5IHRoZXJlIGlzIGFub3RoZXIgcG9wdWxhciBvcHRpb24gaGVyZSB3aGVuIHdvcmtpbmcgd2l0aCBOZXVyYWwgTmV0d29ya3MuLi5SZWN0aWZpZWQgTGluZWFyIFVuaXRzIChSZUxVcykuXG5cblRoZXNlIHNpbXBseSBpZ25vcmUgYWxsIHZhbHVlcyBsZXNzIHRoYW4gMCBhbmQgb25seSByZXR1cm4gcG9zaXRpdmUgdmFsdWVzLlxuXG5UbyBpbXBsZW1lbnQgdGhpcyBpbiBDU1MgaXMgKHJlbGF0aXZlbHkpIHN0cmFpZ2h0IGZvcndhcmQ6XG4gLS1SZUxVOiBjYWxjKG1heCgwLCB2YXIoLS1vdXRwdXQpKSArIHZhcigtLW91dHB1dEJpYXMpKTsgIFxuQW5kIHRlY2huaWNhbGx5IHdlIGRvbid0IGV2ZW4gbmVlZCBjYWxjIGhlcmUgKGJ1dCBJIGFsd2F5cyBsaWtlIHRvIGluY2x1ZGUgaXQpLlxuXG5XaGF0IHRoaXMgZG9lcyBpcyBzYXkgXCJnaXZlIG1lIHRoZSBtYXggdmFsdWUgb2YgXCIwXCIgb3Igb3VyIG91dHB1dCArIGJpYXNcIi5cblxuSWYgb3VyIG91dHB1dCArIGJpYXMgaXMgbGVzcyB0aGFuIDAgdGhlbiB3ZSByZXR1cm4gMCAoYXMgdGhhdCBpcyB0aGUgbWF4IG51bWJlciksIG90aGVyd2lzZSB3ZSByZXR1cm4gb3VyIG91dHB1dCArIGJpYXMhXG5cblN0cmFpZ2h0IGZvcndhcmQgc29sdXRpb24hXG5cbkdldHRpbmcgYSBub3JtYWxpc2VkIHJlc3VsdFxuVGhlcmUgd2FzIGFub3RoZXIgYmlnIHByb2JsZW0gdG8gc29sdmUgaGVyZSwgd2UgbmVlZCBvdXIgTmV1cmFsIE5ldHdvcmsgdG8gYmUgYWJsZSB0byBvdXRwdXQgaXQncyBndWVzcyBhcyBlaXRoZXIgYSAxICh0aGUgZ3Vlc3MpIG9yIGEgMCAobm90IHRoZSBjb3JyZWN0IHZhbHVlKS5cblxuVW5mb3J0dW5hdGVseSB0aGlzIGlzbid0IGhvdyBOZXVyYWwgTmV0d29ya3Mgd29yay4gSW4gZmFjdCB0aGV5IG91dHB1dCBhIGNlcnRhaW50eSBmb3IgYWxsIHZhbHVlcy5cblxuU29tZXRoaW5nIGxpa2U6XG5cbnggPCAwLCB5IDwgMDogMC44NDUgPC0gdGhlIGhpZ2hlc3QgcHJvYmFiaWxpdHlcbnggPiAwLCB5IDwgMDogMC4yODNcbnggPCAwLCB5ID4gMDogMC4xNTRcbnggPiAwLCB5ID4gMDogMC4zMTlcbkFuZCB3ZSBuZWVkIHRvIHR1cm4gdGhhdCBpbnRvOlxuXG54IDwgMCwgeSA8IDA6IDEgPC0gaGlnaGVzdCBwcm9iYWJpbGl0eSB0dXJucyBpbnRvIGEgMVxueCA+IDAsIHkgPCAwOiAwXG54IDwgMCwgeSA+IDA6IDBcbnggPiAwLCB5ID4gMDogMFxuVGhpcyBpcyB3aGVyZSB0aGlzIHRyaWNrIGNvbWVzIGluOlxuICAgIC0tbWF4T3V0OiBtYXgodmFyKC0tb3V0cHV0MWIpLCB2YXIoLS1vdXRwdXQyYiksIHZhcigtLW91dHB1dDNiKSwgdmFyKC0tb3V0cHV0NGIpKTtcblxuICAgIC0tb3V0cHV0MWM6IG1heChjYWxjKDEgLSAoKHZhcigtLW91dHB1dDFiKSAtIHZhcigtLW1heE91dCkpICogKHZhcigtLW91dHB1dDFiKSAtIHZhcigtLW1heE91dCkpICogMTAwMDAwMDAwMCkpLCAwKTtcblRoaXMgbWlnaHQgbG9vayBjb21wbGljYXRlZCwgc28gbGV0J3MgYnJlYWsgaXQgZG93bi5cblxuRmlyc3Qgd2UgbmVlZCB0byBmaW5kIHRoZSBsYXJnZXN0IHZhbHVlIHRoYXQgaXMgb3V0cHV0dGVkIGJ5IG91ciA0IG91dHB1dCBuZXVyb25zLlxuICAgIC0tbWF4T3V0OiBtYXgodmFyKC0tb3V0cHV0MWIpLCB2YXIoLS1vdXRwdXQyYiksIHZhcigtLW91dHB1dDNiKSwgdmFyKC0tb3V0cHV0NGIpKTtcblNvIGlmIG91ciA0IG91dHB1dCBuZXVyb25zIHdlcmUgMjAsMTEsMTYsNCB0aGVuIC0tbWF4T3V0IHdvdWxkIGJlIDIwLlxuXG5UaGVuIHdlIHVzZSB0aGF0IG51bWJlciB0byBkbyB0aGUgZm9sbG93aW5nOlxuXG5zdWJ0cmFjdCB0aGUgbWF4IHZhbHVlIGZyb20gZWFjaCBvdXRwdXQuXG5kbyB0aGlzIGFnYWluIGFuZCBtdWx0aXBseSB0aGVtIHRvZ2V0aGVyICh0aGlzIGFjY291bnRzIGZvciBuZWdhdGl2ZSB2YWx1ZXMpLlxud2UgdGhlbiBtdWx0aXBseSB0aGlzIHZhbHVlIGJ5IDEwMDAwMDAwMDAganVzdCB0byBlbnN1cmUgdGhhdCByb3VuZGluZyBpcyBub3QgYSBwcm9ibGVtLlxudGhlbiB3ZSBzdWJ0cmFjdCB0aGlzIHZhbHVlIGZyb20gXCIxXCIuXG53ZSB0aGVuIHRha2UgdGhlIG1heCB2YWx1ZSBvZiBlaXRoZXIgdGhlIG91dHB1dCBvZiB0aGF0IG9yIDAuXG5UaGlzIHdvcmtzIGFzIGlmIHRoZSB2YWx1ZSBpcyB0aGUgc2FtZSBhcyB0aGUgbWF4IHZhbHVlIHdlIGFyZSBlc3NlbnRpYWxseSBkb2luZyB0aGUgZm9sbG93aW5nOlxuICAtLW91dHB1dDFjOiAxIC0gKCgyMCAtIDIwKSAqICgyMCAtIDIwKSAqIDEwMDAwMDAwMDApXG4gIC0tb3V0cHV0MWM6IDEgLSAoKDApICogKDApICogMTAwMDAwMDAwMCkgLyogd2hpY2ggaXMgMSAtIDAgKi9cbiAgLS1vdXRwdXQxYzogbWF4KDEgLSAoMCksIDApIC8qIHRoZSBtYXggaXMgMSAtIDAgd2hpY2ggaXMgMSAqL1xuSG93ZXZlciBpZiB0aGUgdmFsdWUgaXMgbGVzcyB0aGFuIHRoZSBtYXggdmFsdWUsIHRoZSBmb2xsb3dpbmcgaGFwcGVucyAobGV0J3Mgc2F5IG1heCBpcyAyMCBhbmQgb3VyIHZhbHVlIGlzIDE0KTpcbiAgLS1vdXRwdXQxYzogMSAtICgoMTQgLSAyMCkgKiAoMTQgLSAyMCkgKiAxMDAwMDAwMDAwKVxuICAtLW91dHB1dDFjOiAxIC0gKCgtNikgKiAoLTYpICogMTAwMDAwMDAwMCkgLyogd2hpY2ggaXMgMSAtICgzNiAqIDEwMDAwMDAwMDApICovXG4gIC0tb3V0cHV0MWM6IG1heCgxIC0gKDM2MDAwMDAwMDAwKSwgMCkgLyogdGhlIG1heCBpcyAwIGFzIGl0IGlzIGdyZWF0ZXIgdGhhbiAxIC0gMzYwMDAwMDAwMDAgd2hpY2ggaXMgLTM1OTk5OTk5OTk5ICovXG5UaGlzIHNvbHZlcyBvdXIgY2F0ZWdvcmlzYXRpb24gaXNzdWUhXG5cbkFuZCB0aGF0IGlzIGFsbCB3ZSBuZWVkZWQgdG8gbWFrZSBhIG5ldXJhbCBuZXR3b3JrIChhcyB0aGUgcmVzdCBvZiB0aGUgd29yayBpcyBqdXN0IG11bHRpcGx5aW5nIGJpYXNlcyB0b2dldGhlciB3aXRoIGlucHV0cyB0aGF0IHNob3VsZCBob3BlZnVsbHkgYmUgc2VsZiBleHBsYW5hdG9yeSBpZiB5b3UgcmVhZCBteSBwcmV2aW91cyBhcnRpY2xlKS5cblxuT3V0cHV0dGluZyBzb21lIHZhbHVlc1xuSGVyZSBpcyBvbmUgc3VwZXIgdXNlZnVsIHRyaWNrIEkgaGF2ZSBub3Qgc2VlbiBwZW9wbGUgdXNlIGJlZm9yZS5cblxuV2UgY2FuIHVzZSBDU1MgY291bnRlcigpIGluIG9yZGVyIHRvIGRlYnVnIG91ciBcImFwcGxpY2F0aW9uXCIuXG5cbllvdSBtYXkgYmUgd29uZGVyaW5nIHdoeSB3ZSBuZWVkIHRoaXM/IFdlbGwgaWYgeW91IHRyeSBhbmQgZ2V0IHRoZSB2YWx1ZSBvZiBhIENTUyBjYWxjIGV4cHJlc3Npb24geW91IHdpbGwgc29vbiBydW4gaW50byBwcm9ibGVtcy4gWW91IHdpbGwgZ2V0IHRoZSBzdHJpbmcgYmFjaywgbm90IHRoZSBhY3R1YWwgdmFsdWUhXG4vLyAtLWV4YW1wbGUtdmFyOiBjYWxjKDIwICogMylcbmNvbnNvbGUubG9nKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRpdikuZ2V0UHJvcGVydHlWYWx1ZSgnLS1leGFtcGxlLXZhcicpKVxuLy8gY29uc29sZSB3aWxsIG91dHB1dCBcImNhbGMoMjAgKiAzKVwiIGluc3RlYWQgb2YgNjAhXG5TbyB0aGlzIGlzIHdoeSB3ZSBjYW4gdXNlIHRoZSBjb3VudGVyIHRyaWNrIGluIGEgcGluY2ghXG5cbk5vdywgb25lIHRoaW5nIHRvIG5vdGUgaXMgdGhhdCBjb3VudGVyKCkgaW4gQ1NTIGhhcyBzb21lIGxpbWl0YXRpb25zLiBJdCBvbmx5IGFsbG93cyBmb3IgaW50ZWdlcnMuXG5cblRoaXMgaXMgYSBwcm9ibGVtIGFzIHdlIGFyZSBkZWFsaW5nIHdpdGggYSBsb3Qgb2YgZGVjaW1hbHMuXG5cbkx1Y2tpbHksIGFzIHRoaXMgaXMgb25seSBmb3IgZGVidWdnaW5nLCB3ZSBoYXZlIGEgd29ya2Fyb3VuZC5cblxuQnV0IGJlZm9yZSB3ZSB0YWNrbGUgdGhhdCwgbGV0J3Mgc2hvdyB5b3UgaG93IHlvdSBjYW4gdXNlIENTUyBjb3VudGVycyB0byBncmFiIHNvbWUgdmFsdWVzIGZyb20geW91ciBDU1MuXG4jaW5wdXQxOmFmdGVye1xuICAgIGNvdW50ZXItcmVzZXQ6IGlucHV0MSB2YXIoLS1pbnB1dDEpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBjb250ZW50OiBcImlucHV0IDE6IFwiIGNvdW50ZXIoaW5wdXQxKTtcbn1cbkEgY291cGxlIG9mIHRyaWNrcyBoZXJlLiBGaXJzdCBpcyB0aGF0IHdlIG5lZWQgdG8gYWN0dWFsbHkgb3V0cHV0IHRoZSB2YWx1ZSwgc28gd2UgdXNlIGEgcHNldWRvIGVsZW1lbnQgc28gd2UgY2FuIHV0aWxpc2UgdGhlIGNvbnRlbnQgcHJvcGVydHkgKHJlbWVtYmVyIHdlIGNhbid0IHVzZSBKUyBhcyBpdCB3aWxsIGp1c3Qgb3V0cHV0IHRoZSBzdHJpbmcgdmFsdWUpLlxuXG5UaGUgc2Vjb25kIGlzIHRoYXQgd2UgaW5pdGlhbGlzZSBvdXIgY291bnRlciB3aXRoIHRoZSB2YWx1ZSBvZiBvdXIgQ1NTIHZhcmlhYmxlIHVzaW5nIGNvdW50ZXItcmVzZXQ6LlxuXG5UaGlzIG1lYW5zIHRoYXQgaWYgb3VyIC0taW5wdXQxIGhhcyBhIHZhbHVlIG9mIDQsIHRoZW4gb3VyIGNvdW50ZXIgaXMgKHJlKXNldCB0byA0IGFzIHdlbGwuXG5cbk5vdywgYXMgSSBzYWlkLCBjb3VudGVycyB1c2UgaW50ZWdlcnMuIFRoaXMgaXMgYSBwcm9ibGVtIHdoZW4gd2UgaGF2ZSBkZWNpbWFscy4gVGhlIGFuc3dlciBpcyBzdHJhaWdodCBmb3J3YXJkIChhbHRob3VnaCBpbXBlcmZlY3QpLiBXZSBjYW4gbXVsdGlwbHkgb3VyIGRlY2ltYWwgYnkgYSBsYXJnZSB2YWx1ZSB0byBtYWtlIGl0IGFuIGludGVnZXIuXG5jb3VudGVyLXJlc2V0OiBvdXRwdXQxIGNhbGModmFyKC0tb3V0cHV0MWIpICogMTAwMDAwKTtcblRoaXMgcXVpY2sgaGFjayBtb3ZlcyBvdXIgZGVjaW1hbCBwbGFjZSA2IHBvc2l0aW9ucyB0byB0aGUgcmlnaHQuXG5cbkFzIEkgc2FpZCwgaXQgaXMgdWdseSAoYW5kIHdlIGNvdWxkIHByb2JhYmx5IGRvIHNvbWUgZmFuY3kgdHJpY2tzIHRvIGdldCBvdXIgZGVjaW1hbCBwbGFjZS4uLnRoYXQgbWlnaHQgYmUgYSBmdXR1cmUgZnVuIGV4cGVyaW1lbnQhKSBidXQgaXQgZG9lcyBnaXZlIHVzIHNvbWUgb3V0cHV0cy5cblxuVGhpcyBpcyB0aGUgdGVjaG5pcXVlIHVzZWQgZm9yIHRoZSB3aG9sZSBvZiB0aGUgdGhpcmQgc2VjdGlvbiBvZiB0aGUgZGVtbywgaWYgeW91IGFyZSB3b25kZXJpbmcgaG93IEkgb3V0cHV0dGVkIHRleHQgdGhlcmUuXG5cbkltcG9ydGFudCBub3RlOiBVbmZvcnR1bmF0ZWx5IGNvbnRlbnQ6IHZhbHVlcyBhcmUgbm90IGV4cG9zZWQgdG8gYXNzaXN0aXZlIHRlY2hub2xvZ3kuIEFuZCB0aGlzIGlzIHRoZSBtYWluIHJlYXNvbiB3aHkgXCJDU1Mgb25seVwiIGlzIGZvciBub3RoaW5nIG1vcmUgdGhhbiBmdW4gbW9zdCBvZiB0aGUgdGltZS5cblxuRG8gbm90IHVzZSB0aGlzIHRyaWNrIGluIHByb2R1Y3Rpb24sIGp1c3Qgc2F2ZSBpdCBmb3IgZGVidWdnaW5nIHdoZW4gb3RoZXIgbWV0aG9kcyBmYWlsLlxuXG5Bbnl3YXksIHRoYXQgaXMgdGhlIGhhY2ssIEkgaG9wZSB0aGF0IG9uZSBkYXkgaXQgd2lsbCBoZWxwIHlvdSBvdXQhXG5cblRyaWNrcyBmb3IgdGhlIGRlbW8gaXRzZWxmXG5JIHdhbnRlZCB0aGUgZGVtbyBpdHNlbGYgdG8gYWxzbyBiZSBDU1Mgb25seS4gU28gdG8gYWNoaWV2ZSB0aGlzIHRoZXJlIGFyZSB0d28gdHJpY2tzIGhlcmUuXG5cblRoZSBpbnB1dCBncmlkXG5UaGUgZmlyc3QgaXMgdGhlIGlucHV0IFwiZ3JpZFwiIHdlIGhhdmUgY3JlYXRlZC5cblxuQmVjYXVzZSB3ZSBvbmx5IHdhbnQgb25lIHZhbHVlIHRvIGJlIHNlbGVjdGVkIGF0IGEgdGltZSAob3VyIHggYW5kIHkgY29vcmRpbmF0ZXMpIEkgdXNlZCBhIDxpbnB1dCB0eXBlPVwicmFkaW9cIj4gYW5kIHRoZW4gbGFpZCBpdCBvdXQgaW4gYSBncmlkIHNoYXBlIHVzaW5nIGZsb2F0cyBhbmQgY2xlYXJzIVxuXG5CdXQgdGhlIG1haW4gdHJpY2sgd2FzIHRoYXQgSSB3YW50ZWQgdG8gc3RpbGwgbWFrZSB0aGlzIGtleWJvYXJkIGFjY2Vzc2libGUsIHNvIEkgdXNlZCBhIHRyaWNrIHdoZXJlIEkgdmlzdWFsbHkgaGlkZSB0aGUgaW5wdXQgYW5kIHRoZW4gYWRqdXN0IHRoZSBsYWJlbCBhcHBlYXJhbmNlIGJhc2VkIG9uIHN0YXRlLlxuXG5XZSB0aGVuIHVzZSB0aGUgbGFiZWxzIHRoZW1zZWx2ZXMgaW4gb3JkZXIgdG8gY3JlYXRlIG91ciBncmlkIHNoYXBlLlxuLyogb3VyIGxhYmVsIGlzIHRoZSBhY3R1YWwgZ3JpZCBzcXVhcmUgKi9cbmxhYmVse1xuICAgIC0td2g6IG1pbigxMHZ3LCA2MHB4KTtcbiAgICB3aWR0aDogdmFyKC0td2gpO1xuICAgIGhlaWdodDogdmFyKC0td2gpO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNiYjAwMDA7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMC4ydnc7XG4gICAgb3V0bGluZTogMXB4IHNvbGlkICM2NjY7XG59XG5cbmlucHV0W3R5cGU9XCJyYWRpb1wiXXtcbiAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgY2xpcC1wYXRoOiBpbnNldCg1MCUpO1xuICBoZWlnaHQ6IDFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3aWR0aDogMXB4O1xufVxuXG5pbnB1dDpjaGVja2VkICsgbGFiZWx7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwZmYwMDtcbiAgICBvdXRsaW5lOiA0cHggc29saWQgIzAwMDtcbiAgICBvdXRsaW5lLW9mZnNldDogLTRweDtcbn1cblxuaW5wdXQ6Zm9jdXMgKyBsYWJlbHtcbiAgICBvdXRsaW5lOiA4cHggc29saWQgIzMzMztcbiAgICBvdXRsaW5lLW9mZnNldDogLThweDtcbiAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xufVxuXG5cblRvIGFjaGlldmUgdGhpcyB3ZSB1c2UgdGhlICsgb3BlcmF0b3IuIFRoaXMgZ3JhYnMgdGhlIG5leHQgc2libGluZyAoaXRlbSBvbiB0aGUgc2FtZSBcImxldmVsXCIpIHRoYXQgbWF0Y2hlcyB0aGF0IHNlbGVjdG9yLlxuXG5TbyBieSBncmFiYmluZyBpbnB1dDpjaGVja2VkIGFuZCB0aGVuIGZpbmRpbmcgdGhlIG5leHQgbGFiZWwgdG8gdGhhdCBpbnB1dCB3aXRoIHRoZSArIG9wZXJhdG9yLCB3ZSBhcmUgYWJsZSB0byB1c2Ugb3VyIGxhYmVscyBhcyB0aGUgaXRlbXMgd2UgZGlzcGxheSwgaW5zdGVhZCBvZiB0aGUgcmFkaW8gaW5wdXRzIHRoZW1zZWx2ZXMsIGFsbCB3aGlsZSBtYWtpbmcgdGhlIHJhZGlvIGlucHV0cyBzdGlsbCBhY2Nlc3NpYmxlLlxuXG5Ob3csIHNwZWFraW5nIG9mIHRoZSByYWRpbyBpbnB1dHMsIEkgZGlkIG1lbnRpb24gdGhhdCB3ZSBuZWVkIHRvIHZpc3VhbGx5IGhpZGUgdGhlbSFcbmlucHV0W3R5cGU9XCJyYWRpb1wiXXtcbiAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgY2xpcC1wYXRoOiBpbnNldCg1MCUpO1xuICBoZWlnaHQ6IDFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3aWR0aDogMXB4O1xufVxuVGhlIENTUyBhYm92ZSBtZWFucyB0aGF0IHRoZSBpbnB1dCBpcyBzdGlsbCBhY2Nlc3NpYmxlIHRvIGFzc2lzdGl2ZSB0ZWNobm9sb2d5IGFuZCBzdGlsbCBmb2N1c2FibGUsIGJ1dCBpdCBkb2VzIG5vdCB0YWtlIHVwIGEgc2luZ2xlIHBpeGVsIHZpc3VhbGx5LlxuXG5Db21iaW5pbmcgdGhpcyB3aXRoIHRoZSBwcmV2aW91cyB0cmljayB3ZSBjYW4gY3JlYXRlIGEgZ3JpZCBvZiByYWRpbyBpbnB1dHMhXG5cblRoZSBvdXRwdXQgZ3JpZFxuQWhoaCB0aGUgZmluYWwgdHJpY2sgaGVyZS5cblxuSWYgeW91IHJlbWVtYmVyIGVhcmxpZXIgd2UgY3JlYXRlZCBhIHdheSB0byBtYWtlIG91ciBuZXVyYWwgbmV0d29yayBvdXRwdXQgYSAxIG9yIGEgMC5cblxuQnV0IGhvdyBkbyB3ZSB0dXJuIHRoYXQgaW50byBhIFwicmVkXCIgYW5kIFwiZ3JlZW5cIiBmb3IgZWFjaCBvZiB0aGUgNCBxdWFkcmFudHMgZGVwZW5kaW5nIG9uIHRoZSBvdXRwdXQ/XG5cblRoaXMgaXMgd2hlcmUgd2UgY2FuIHVzZSBhIG5lYXQgdHJpY2sgd2l0aCBsaW5lYXIgZ3JhZGllbnRzIGFuZCBvcGFjaXR5IGZvciBvdXIgZmlsbCBhbmQgb3V0bGluZSByZXNwZWN0aXZlbHkhXG4tLWNvbG9yMTogIzAwZmYwMDtcbi0tY29sb3IyOiAjOTkwMDAwO1xuLS1zd2l0Y2gxOiB2YXIoLS1jb2xvcjEpIGNhbGMoMTAwJSAqIHZhcigtLW91dHB1dDFjKSksIFxuICAgICAgICAgICAgICAgICB2YXIoLS1jb2xvcjIpIDA7XG4tLXN3aXRjaDFvdXRsaW5lOiByZ2JhKDAsMCwwLCBjYWxjKDEwMCUgKiB2YXIoLS1vdXRwdXQxYykpKTtcbkZvciBvdXIgLS1zd2l0Y2gxLCB3ZSB3YW50IHRoZSBzcXVhcmUgdG8gZWl0aGVyIGJlIGNvbG91ciByZWQgKGlmIHRoZSB2YWx1ZSBpcyAwKSBvciBjb2xvdXJlZCBncmVlbiAoaWYgdGhlIHZhbHVlIGlzIDEpLlxuXG5CeSB0b2dnbGluZyB0aGUgcGVyY2VudGFnZSBvZiBvdXIgZmlyc3QgY29sb3VyIGJldHdlZW4gZWl0aGVyIDEwMCUgKGNvdmVyIHRoZSBzcXVhcmUpIG9yIDAlIChvdXIgc2Vjb25kYXJ5IGNvbG91ciB3aWxsIHRha2Ugb3Zlcikgd2UgZ2V0IGEgbmVhdCB3YXkgb2YgdG9nZ2xpbmcgdGhlIGNvbG91ci5cblxuV2UgdXNlIGEgc2ltaWxhciB0ZWNobmlxdWUgb24gb3VyIG91dGxpbmUsIGFkanVzdGluZyB0aGUgYWxwaGEgdmFsdWUgKHRyYW5zcGFyZW5jeSkgdG8gZWl0aGVyIDEwMCUgKHZpc2libGUpIG9yIHRvIDAlIChpbnZpc2libGUpLlxuXG5CeSBhcHBseWluZyB0aGVzZSBzdHlsZXMgdG8gZWFjaCBvZiB0aGUgNCBzcXVhcmVzIHRoYXQgbWFrZSB1cCBvdXIgb3V0cHV0IGdyaWQgYXMgZm9sbG93czpcbiNvdXQteC0xeS0xe1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh2YXIoLS1zd2l0Y2gxKSk7XG4gICAgb3V0bGluZTogNHB4IHNvbGlkIHZhcigtLXN3aXRjaDFvdXRsaW5lKTtcbiAgICBvdXRsaW5lLW9mZnNldDogLTRweDtcbn1cblRoZW4gZGVwZW5kaW5nIG9uIHdoaWNoIGdyaWQgc3F1YXJlIGhhcyBhbiBvdXRwdXQgb2YgXCIxXCIgd2UgZWl0aGVyIGdldCBhIGRhcmsgcmVkIHNxdWFyZSBvciBhIGJyaWdodCBncmVlbiBzcXVhcmUgd2l0aCBhIGRhcmsgb3V0bGluZS5cblxuLy8gLS0tIFxuXG5Ub2RheSB3ZSB3aWxsIG1ha2UgYSBFQ01BIG1vZHVsZSBmb3IgZ2VuZXJhdGluZyBjcmF6eSBDU1MgbGlrZSB0aGlzLCBiZWNhdXNlIENTUyBpcyBxdWljaywgYW5kIGhhcyBhbiB1cGRhdGUgbG9vcCBidWlsZCBpbi4gd2Ugd2lsbCBtYWtlIGNvbXBvbmVudHMgYW5kIGdlbmVyYXRvcnMvZmFjdG9yaWVzIGluIG9yZGVyIHRvIG1ha2Ugc2hvcnRoYW5kcyB0aGF0IGNhbiBiZSBjb21waWxlZCBpbnRvIGEgQ1NTIHN0cmluZywgYW5kIHRoZW4gYWRkZWQgdG8gdGhlIERPTS4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==