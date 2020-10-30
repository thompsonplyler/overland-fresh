import '../App.css';


function FakeChat() {
    const randomphrases = ['We the people','in order to form','a more perfect union','establish justice','insure domestic tranquility','provide for the common defence, promote the general welfare','and secure the blessings of liberty','to ourselves','and our posterity','do ordain and establish this constitution','of the United States of America'];

    let c = 0;
    let t;
    let timer_is_on = 0;
    
    timedCount();
    
    function timedCount()
    {
     t = setTimeout( function(){ 
         timedCount() 
        }, 1500 );

     let random = Math.floor(Math.random() * (11 - 0 + 1)) + 0;
     
    //  $('.putmehere').html( randomphrases[random]);
    
    }

    return(
        <div className="chat-area">
            {randomphrases[0]}
        </div>
    )
}

export default FakeChat;