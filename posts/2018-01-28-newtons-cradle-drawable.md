---
title: "Newton's Cradle Drawable (Tumbleweed Android)"
date: 2018-01-28
url: /blog/2018/01/28/newtons-cradle-drawable/index.html
---

![gif]({{ this.$withBase('/assets/gif/newton-cradle.gif') }})

Implementation steps to create Newton's Cradle drawable for Android.

<p $excerpt></p>

First of all we will need to add `tumbleweed-android` module to our dependencies.

{{ this.$include(this, 'includes/tumbleweed_about.html') }}

```groovy
implementation 'ru.noties:tumbleweed-android:1.0.1'
```

Now we have the `DrawableTweenManager` that gives us means to create all kind of tweens for our custom drawables. Let's start adding some code. Create an empty implementation of a Drawable:

```java
public class NewtonsCradleDrawable extends Drawable {

    @Override
    public void draw(@NonNull Canvas canvas) {
        
    }

    @Override
    public void setAlpha(int alpha) {
        // no op
    }

    @Override
    public void setColorFilter(@Nullable ColorFilter colorFilter) {
        // no op
    }

    @Override
    public int getOpacity() {
        return PixelFormat.OPAQUE;
    }
}
```

Let's throw in some variables for our drawable:

```java
public class NewtonsCradleDrawable extends Drawable {

    // static constant indicating how many physical circles we have
    // 0_00_0, two circles are added for actual interpolation
    private static final int PARTS = 6;

    // initialise DrawableTweenManager
    private final TweenManager tweenManager = DrawableTweenManager.create(this);

    // Paint object to be used when drawing circles
    private final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);

    // RectF representing bounds of one circle
    private final RectF rectF = new RectF();

    // colors of our circles
    private final int[] colors;

    // duration of our interpolation
    //
    // NB TweenManager uses SECONDS instead of MILLISECONDS, so
    // so, 250L would be 0.25F
    private final float duration;

    public NewtonsCradleDrawable(@Size(4) @NonNull int[] colors, @FloatRange(from = .0F) float duration) {
        this.colors = colors;
        this.duration = duration;

        paint.setStyle(Paint.Style.FILL);
    }

    /* Not changed omitted */
}
```

For the sake of brevity we will make our Drawable _intermediate_ (aka always running like a progress indicator). Of cause we could implement `Animatable` and start/stop animation manually, but this is a bit off the scope of this article.

So, let's override `onBoundsChange` method to calculate the coordinates of our circles:

```java
public class NewtonsCradleDrawable extends Drawable {

    // this variable is holding our margins (so circles are positioned correctly on a Canvas)
    private Margins margins;

    @Override
    protected void onBoundsChange(Rect bounds) {
        super.onBoundsChange(bounds);

        // we will stop all possibly running interpolations here
        tweenManager.killAll();

        // our drawable will occupy square shape, so find
        // the smallest dimension and use it as a base

        final int width = bounds.width();
        final int height = bounds.height();

        final int side = Math.min(width, height);

        // this is the diameter of our circles
        final int diameter = side / PARTS;

        // calculate our margins
        margins = calculateMargins(width, height, side, diameter);
        
        // apply calculated bounds
        rectF.set(0, 0, diameter, diameter);

        startAnimation();
    }

    private void startAnimation() {
        // we will get to it in the next section
    }

    @NonNull
    private static Margins calculateMargins(int width, int height, int side, int diameter) {

        final int x = (width - side) / 2;
        final int y = ((height - side) / 2) + ((side - diameter) / 2);

        return new Margins(x, y);
    }

    private static class Margins {
        final float x;
        final float y;

        Margins(float x, float y) {
            this.x = x;
            this.y = y;
        }
    }

    /* Not changed omitted */
}
```

Now, let's deal with animation. We will be interpolating just 2 properties: `left` (the travel distance of the left circle) and `right` (travel distance of the right circle):

```java
public class NewtonsCradleDrawable extends Drawable {

    // travel distance of the left circle
    private float left;

    // travel distance of the right circle
    private float right;

    /* Not changed omitted */
}
```

Right now they both are `0`, so this represents circles' state like this: `0_000_`. Let's interpolate these values to create Newton's Cradle effect:

```java
public class NewtonsCradleDrawable extends Drawable {

    private void startAnimation() {

        // this is maximum value of our interpolation
        final float diameter = rectF.width();

        // Tumbleweed contains a big set of predefined equations (aka interpolators in Android world)
        final TweenEquation equationIn = Quart.IN;
        final TweenEquation equationOut = Quart.OUT;

        // start animation
        Timeline.createSequence()
                .push(Tween.to(this, LEFT_TWEEN, duration).target(diameter).ease(equationIn))
                .push(Tween.to(this, RIGHT_TWEEN, duration).target(diameter).ease(equationOut))
                .push(Tween.to(this, RIGHT_TWEEN, duration).target(0).ease(equationIn))
                .push(Tween.to(this, LEFT_TWEEN, duration).target(0).ease(equationOut))
                .repeat(-1, 0) // will create endless animation and 0 as the delay between repetitions
                .start(tweenManager);
    }

    /* Not changed omitted */
}
```

Tumbleweed comes with a lot of predefined TweenTypes for Views and Drawables, but as we interpolating custom properties we will need to create these two:

```java
public class NewtonsCradleDrawable extends Drawable {

    // TweenType is by design stateless, so it's safe to create a static constant
    private static final TweenType<NewtonCradleDrawable> LEFT_TWEEN = new TweenType<NewtonCradleDrawable>() {
        @Override
        public int getValuesSize() {
            return 1;
        }

        @Override
        public void getValues(@NonNull NewtonCradleDrawable newtonCradleDrawable, @NonNull float[] values) {
            values[0] = newtonCradleDrawable.left;
        }

        @Override
        public void setValues(@NonNull NewtonCradleDrawable newtonCradleDrawable, @NonNull float[] values) {
            newtonCradleDrawable.left = values[0];
        }
    };

    private static final TweenType<NewtonCradleDrawable> RIGHT_TWEEN = new TweenType<NewtonCradleDrawable>() {
        @Override
        public int getValuesSize() {
            return 1;
        }

        @Override
        public void getValues(@NonNull NewtonCradleDrawable newtonCradleDrawable, @NonNull float[] values) {
            values[0] = newtonCradleDrawable.right;
        }

        @Override
        public void setValues(@NonNull NewtonCradleDrawable newtonCradleDrawable, @NonNull float[] values) {
            newtonCradleDrawable.right = values[0];
        }
    };

    /* Not changed omitted */
}
```

Now, it's the time to finally **draw** something:

```java
public class NewtonsCradleDrawable extends Drawable {

    @Override
    public void draw(@NonNull Canvas canvas) {

        // if we have no bounds information, do not draw anything, just wait
        if (getBounds().isEmpty()) {
            return;
        }

        // create a 'checkpoint' for the current state of Canvas
        final int save = canvas.save();
        try {

            // if we have margins initialised, apply them
            if (margins != null) {
                canvas.translate(margins.x, margins.y);
            }

            // calculated width (diameter) and radius of our circles
            final float width = rectF.width();
            final float radius = width / 2;
            
            // draw left circle
            drawCircle(canvas, left, radius, colors[0]);
            
            // translate the Canvas by 2 diameters to start drawing static circles
            // --00__
            canvas.translate(width * 2, .0F);

            // draw the second (static) circle
            drawCircle(canvas, .0F, radius, colors[1]);
            
            // move one diameter further __-0__
            canvas.translate(width, .0F);

            // draw the third (static) circle
            drawCircle(canvas, .0F, radius, colors[2]);

            // move again by one diameter ___-0_
            canvas.translate(width, .0F);

            // draw the last circle
            drawCircle(canvas, right, radius, colors[3]);

        } finally {
            // after we are finished, restore Canvas state
            canvas.restoreToCount(save);
        }
    }

    private void drawCircle(@NonNull Canvas canvas, float x, float radius, int color) {

        final boolean translate = x > 0;

        if (translate) {
            canvas.save();
            canvas.translate(x, .0F);
        }

        paint.setColor(color);
        canvas.drawRoundRect(rectF, radius, radius, paint);

        if (translate) {
            canvas.restore();
        }
    }

    /* Not changed omitted */
}
```

So, we have our implementation ready, let's use it:

```java
// for example in our Activity
public class NewtonsCradleActivity extends Activity {

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // I will use raw hex values, but in real application obtain these from your resources
        final int[] colors = {
                0xffEF5350, // red_400
                0xff42A5F5, // blue_400
                0xff66BB6A, // green_400
                0xffFFA726  // orange_400
        };

        // remember that Tumbleweed uses seconds as duration measure unit
        // so, this would be 350L milliseconds
        final float duration = .35F;

        final NewtonsCradleDrawable drawable = new NewtonsCradleDrawable(colors, duration);

        final View view = new View(this);
        view.setBackground(drawable);

        setContentView(view);
    }
}
```

And this will give us already mentioned result (inserting it again, so you don't have to scroll):

![gif]({{ this.$withBase('/assets/gif/newton-cradle.gif') }})


### Conclusion

The final implementation might seem as a bit too wordy, but it's not that bad once you get acquainted with custom Drawables and logic behind drawing on a Canvas. What's important that the code for creating an animation is compact and easy to read. And that's not to mention that is ready to be easily extended. Try playing with the TweenEquations and see what result you get. Maybe add a small vertical translation for moving circles. Or even animate colors of the circles. Tumbleweed will allow you to play with the small details and get the feedback fast, until you achieve your desired effect.