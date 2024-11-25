function Question(props: {question: string, id: string, children: any}) {
    return <details open>
        <summary id={props.id} className="text-xl pt-2 text-[#879b88]">{props.question}</summary>
        {props.children}
        <br/>
    </details>
}

export default function FAQ() {
    return <section id="faq" className="pt-5">
    <h2 className="text-2xl font-extrabold text-[#879b88]">FAQ</h2>
<div className="px-5">
    
<Question id="rsvp-deadline" question="What is the deadline to RSVP?">
    <p>Please do so by March 15!</p>
</Question>
<Question id="plus-one" question="Can I bring a date?">
    <p>We'll only be able to accommodate those who were directly invited. Unless your invitation is addressed to "X and Guest," or with your guest's name, we kindly ask that you do not bring a guest.</p>
</Question>
<Question id="kids" question="Are kids welcome?">
    <p>We'll only be able to accommodate those who were directly invited. Unless your invitation is addressed to "the X Family," we kindly ask that you do not bring your children.</p>
</Question>
<Question id="weather" question="What will the weather be like?">
    <p>Summer in Madison is just about the best weather anyone could ask for! For June 1st, there is typically a high of 78 degrees and a low of 58 degrees. However, spring and early summer is typically the rainy season, so be prepared for showers!</p>
</Question>
<Question id="indoor+outdoor" question="Will I be outside?">
    <p>Weather permitting, the ceremony will be outdoors, the cocktail hour will be on the patio, and the reception will be indoors with the option of hanging out on the patio.</p>
</Question>
<Question id="photos" question="Can I take pictures during the wedding or reception?">
    <p>We respectfully request that guests do not take photographs during the ceremony as professional pictures will be taken throughout the day. We invite you to relax, enjoy the moment and we'll gladly share these images with you after the celebration. However, we would love for you to take photos/videos at the reception and share them with us! </p>
</Question>
<Question id="parking" question="What will the parking situation be?">
    <p>There is a large parking lot at Harvest Moon Pond if you want to drive. However, all cars must be removed from the venue by 9am the next day.</p>
</Question>
<Question id="accessibility" question="Is the venue accessible?">
    <p>Most of the venue is accessible without needing to go up or down stairs. Our back-up ceremony location is up one flight of stairs in the barn. For anyone with difficulty walking, there will be golf carts on site for getting around.</p>
</Question>
<Question id="lodging" question="Where should I stay?">
    <p>We have a block of rooms at the Hilton Garden Inn Madison Downtown. We'll have a shuttle to and from the venue from there. If you're staying somewhere else, we recommend renting a car or using a ride share service.</p>
</Question>
<Question id="food" question="How will food & drinks be served?">
    <p>Dinner will be a buffet with options of lasagna, ravioli, salad, rolls, and vegetable kabobs for our vegan and gluten free guests. Most sides will be vegan and gluten free.</p>
    <br/>
    <p>The venue has a bar. Batch cocktials, beer, and wine are free, up to the amount we've purchased. After that, or for any other drinks, you'll be able to pay for it.</p>
</Question>
<Question id="dietary-restrictions" question="What about my dietary restrictions?">
    <p>There will be a question in the RSVP for any dietary restrictions we should know about. We will have vegetarian, vegan, and gluten free options at the dinner buffet and will ensure that those with dietary restrictions are able to have their requests met. Please reach out to Hannah or Jack if you have any additional questions or concerns.
    </p>
</Question>
<Question id="dancing" question="Will there be dancing?">
    <p>Yes!! We'll also have an area for games in the loft.</p>
</Question>

</div> </section>
}