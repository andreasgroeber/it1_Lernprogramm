"use strict"

/* Globale Variablen--------------------------------------------------------------------*/
var correct=0;                  //richtige-Antworten
var counter=0;                  //Aufgaben-Zähler
var nummer=0;                   //Thema-Nummer (1.Allg.,2.Mathe,3.IT.,4.Ajax)
var name="init_NULL";           //Thema-Name
var ds;                         //Datensätze
var random_quest=["init_NULL"]  //Frage Array (wird verwürfelt), wird in Themenwahl gefüllt mit 0 ... n datensätzen
var katarr=["init_NULL","init_NULL","init_NULL","init_NULL"] //Kat vgl.Array
var onlarr=["init_NULL"]        // wird in Onl.themenwahl gefüllt mit festen werten
var total_ds=0                  // Anzahl Fragen eines Bereichs

var url= "https://irene.informatik.htw-dresden.de:8888/api/quizzes/" // kann auch lokal gespeichert werden.
/*--------------------------------------------------------------------------------------*/                                                                     // so aber übersichtlicher






/*---------------------------Load-Listner----------------- */



document.addEventListener('DOMContentLoaded', function(){ // Dokument vollständig laden 

    let m = new Model();    //Screencast 
    let p = new Presenter();
    let v = new View(p);
    p.setMandV(m,v);
  //      setTimeout(p.start, 1000)
    p.start();
});             

/*                  show+hide           */

function Showbutton() { //Antwortbuttons zeigen // "1cs"

       document.querySelectorAll(".answerbutton").forEach(x => x.style.visibility = "visible");
       console.log("Answerb show")
    
}

function Hidebutton() { //verstecken
    document.querySelectorAll(".answerbutton").forEach(x => x.style.visibility = "hidden");
    console.log("Answerb hide")
}

            /*   Anwortbuttons (de-)/aktivieren + wait funktion     */
 function EnableAnswer(){
    for(let i=0;i < 4; i++)
    {
        document.getElementById("a"+(i+1)).disabled=false; //a+1 weil a1-a4 antwortbuttons!
    }
    console.log("Buttons enabled")
} 

function DisableAnswer()
    {
        for(let i=0;i < 4; i++)
        {
        document.getElementById("a"+(i+1)).disabled=true; //a+1 weil a1-a4 antwortbuttons!
        }
        console.log('Buttons disabled');
    }

    function wait(ms,fun){      //wie lange delayed, was delayen
        setTimeout(function(){  /* cs3 */
            fun();
           },ms)
    }

    // cs 4
    function RandomizeArray(array) {
        const shuffledArray = array.sort((a, b) => 0.5 - Math.random())
    }       










// Screencast Vorlesung sw

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("manifest+sw/sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch((err) => console.log("Service Worker registration failed", err));
    });
  } 



// Online Check
let con = window.navigator.onLine; 
if (con) {console.log("Status: online")}                         //könnte hier einen Wert zurückgeben und gegebenenfalls Online Zeichen einblenden
else {console.log("Status: offline")}



//------------------Modell (Daten)-----------------------------------------------------------------------------
// Nach   https://github.com/HTWDD-RN/Lernprogramm/blob/Beleg-2023/Beleg-Aufgabenstellung.md
// Hilfe  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse?retiredLocale=de

class Model
{

getDS() //cs2 
 {
        let database =
         '{' +
            '"Teil" :' +
           '[' +
            '{' + 
            '"Aufgaben"  : [' +
                // Vorlage: '{"a":"Frage?","l":["r","f","f","f"]},'+
                '{"a":"Wie viele Menschen leben ungefähr in Deutschland (in Millionen)?",                  "l":["80","130","30","270"]},'+
                '{"a":"In welchem Jahr veröffentlichte Martin Luther seine 95 Thesen in Wittenberg?",      "l":["1517","1417","1714","1515"]},'+
                '{"a":"Wie hieß Deutschland unmittelbar nach dem Ende des ersten Weltkriegs(1919-1933)?",  "l":["Weimarer Republik","Heiliges Römisches Reich","Deutsche Demokratische Republik","Bundesrepublik Deutschland"]},'+
                '{"a":"Wie viele WM-Pokale hat Deutschland bisher gewonnen?",                              "l":["3","0","1","2"]},'+
                '{"a":"Welche folgenden Flaggen enthält die Farben (alle): rot,blau,weiß?",                "l":["Großbritannien","Belgien","Brasillien","Georgien"]},'+
                '{"a":"Wie viele Zähne hat ein erwachsener Mensch normalerweise (mit Weisheitszähnen)?",   "l":["32","36","26","28"]},'+
                '{"a":"Wer wählt den Bundespräsidenten?",                                                  "l":["Bundesversammlung","Bundeskanzler","Bundesrat","Bundestag"]},'+
                '{"a":"Wie heißt die Hauptstadt von Thüringen",                                            "l":["Erfurt","Magdeburg","Dresden","Potsdam"]},'+
                '{"a":"Was bezeichnet ein Oxymoron",                                                       "l":["einen inneren Wiederspruch","ein Satzende","eine Frageform","zwei Worte mit dem selben Anfangsbuchstaben"]},'+
                '{"a":"Was sagte Cäser bei der überquerung des Rubikon",                                   "l":["alea iacte est (der Würfel ist gefallen)","veni vidi vici(Ich kamm, Ich sah, Ich siegte)","divide et empera (teile und herrsche)","ad bestias (zu den wilden Tieren)"]}'+
                           ']'+
            '},' +
            '{' + 
            '"Aufgaben"  : [' +
            //https://www.matheretter.de/rechner/latex "/" mit "////" ersetzten
            //'{"a":"Frage:$Katex$","l":["$j$","$n$","$n$","$n$"]},'+
            '{"a":"berechne:$\\\\lim\\\\limits_{x\\\\to\\\\infty} (e^{x}*(-3)^{x}+x^2)$","l":["$\\\\infty$","$-\\\\infty$","$0$","$-3$"]},'+
            '{"a":"an welcher Stelle ist :$f(x,y)\\\\in \\\\mathbb{R}², \\\\sqrt{|y|}*\\\\frac{2x+5}{y-x}$ nicht defniert","l":["$y=x$","$y=-2$","$x=-2,5$","$y=0$"]},'+
            '{"a":"leite ab (nach x): $x^{y}+1$","l":["$x^{y-1}y$","$(-1)^{y}y$","$x^{y}+y$","$x^{y}$"]},'+
            '{"a":"berchne: $5+5*(-3)^{2}$","l":["$50$","$90$","$30$","$-90$"]},'+
            '{"a":"berechne: $\\\\int \\\\frac {1}{(1+x²)}dx$","l":["$arctan(x)+c$","$sin^{x}(x)+c$","$\\\\frac{-2}{1+x^{3}}+c$","$(1+x)*\\\\frac{1}{1+x^{2}}+c$"]},'+
            '{"a":"bilde die Umkehrfunktion von:$f(x)=e^{x},x\\\\geq1$","l":["$f(x)^{-1}=ln(x)$","$f(y)=xe^{x}$","$f(x)^{-1}=e^{-x}$","$f(x)=\\\\frac{1}{e^{x}}$"]},'+
            '{"a":"welche der Summen gibt die Harmonische Reihe an?","l":["$\\\\sum \\\\limits_{k=1}^{\\\\infty} \\\\frac{1}{k}$","$\\\\sum \\\\limits_{k=1}^{n} f_{i}=f_{n+2}-1$","$1+\\\\frac{1}{3}+\\\\frac{1}{9}+...+\\\\frac{1}{\\\\infty}$","$\\\\sum \\\\limits_{k=1}^{n} |sin(x)|*k$"]},'+
            '{"a":"berechne das Produkt der Hauptdiagonale: $\\\\begin{pmatrix}  1 & 2 & 3 \\\\\\\\ a & b & c \\\\\\\\ 5 & 10 & 15 \\\\end{pmatrix}$","l":["$15b$","$10b$","$12a$","$20ab$"]},'+
            '{"a":"wie lautet die Formel zur Berechnung des Kreis Umfangs?", "l":["$2\\\\pi r^{2}$", "$\\\\frac{1}{2}\\\\pi r$", "$4\\\\pi^{2}$", "$\\\\pi^{2}r$"]},' +
            '{"a":"vereinfache:$(x+4)(x-4)$", "l":["$x^{2}-16$", "$x^{2}-8x+16$", "$x^{2}+8x-16$", "$x^{2}-16x+8$"]}' + 
                            ']'+
            '},' + 
            '{' + 
            '"Aufgaben"  : [' +
            '{"a":"In welcher Network Byte Order liegen Daten im Internet vor","l":["Big-Endian","Little-Endian","Middle-Endian","Bi-Endian"]},'+
            '{"a":"Welche der Folgenden HTML-Methoden gibt es nicht","l":["EXCHANGE","GET","POST","TRACE"]},'+
            '{"a":"Auf Grundlage welches Protokolls der Transportschicht arbeitet HTTPS","l":["TCP","UDP","IP","Ethernet"]},'+
            '{"a":"Was bezeichnet das Wort: Cookies im Internet Kontext ","l":["kleine Dokumente die Zustände/Daten enthalten","schädliche Malware","Lesezeichen","große Webserver"]},'+
            '{"a":"Was bezeichnet der Begriff: URL","l":["eine Adresse im Internet","ein Protokoll","eine First-Level-Domain","einen lokalen Dateipfad"]},'+
            '{"a":"Welchen Statuscode gibt ein Server Standardmäßig zurück, wenn der Zugriff, auf die gewünschte Ressource, verweigert wurde","l":["403","404","304","501"]}'+
                            ']'+
            '}' + 
           ']' +
         '}';
        return JSON.parse(database);  
    
 }
}



//------------------Präsenter (Austausch)----------------------------------------------------------------------
class Presenter
{
    setMandV(m,v)
    {
    this.m = m;
    this.v = v;
    }

    start() {}


    Themenwahl(nummer) 
    {
        let name;
        if(nummer==0){name="Allgemeinwissen"}       //nummer+name verknüpfen
        if(nummer==1){name="Mathematik"}
        if(nummer==2){name="Internettechnologien"}

        console.log("Presenter -> Themenwahl:" +nummer +"("+ name + ")");

        /* globale variabeln setzen */

        window.nummer=nummer;
        window.name=name;   
        window.counter=1;       
        window.correct=0;
    
        document.getElementById("Thema").innerHTML = name + " Frage: " + counter;
        Showbutton();

    
        window.ds =  this.m.getDS();
        ds=window.ds;

        /* Anzahl Fragen im Json.Object bestimmen und diese verwürfeln  cs 5 */

        window.total_ds=Object.keys(window.ds.Teil[window.nummer].Aufgaben).length;
        window.random_quest= [];
        for (var i = 0; i < total_ds ; i++) {
            window.random_quest.push(i);
        }
       RandomizeArray(window.random_quest)
        // console.log("Total ds: "+Total_ds);
        // console.log(random_quest);
        /*------------------------------------------------------------------*/

        let random_answ=[0,1,2,3];
        RandomizeArray(random_answ);
    
    document.getElementById("progbar").value=0;
    document.getElementById("progbar").style.visibility="visible";
    console.log("Aufgabenteil:" + name)

        if(window.nummer==1)        //katex rendern!
        {
            for(let i=0;i<4;i++)
            {
                window.katarr[i]=ds.Teil[window.nummer].Aufgaben[random_quest[0]].l[random_answ[i]];
            }
            //console.log(window.katarr);
            document.getElementById("Aufgabe").innerHTML = ds.Teil[window.nummer].Aufgaben[random_quest[0]].a + "<br>" +
                                                           "a: "+ ds.Teil[window.nummer].Aufgaben[random_quest[0]].l[random_answ[0]] + "<br>" +
                                                           "b: "+ ds.Teil[window.nummer].Aufgaben[random_quest[0]].l[random_answ[1]] + "<br>" +
                                                           "c: "+ ds.Teil[window.nummer].Aufgaben[random_quest[0]].l[random_answ[2]] + "<br>" +
                                                           "d: "+ ds.Teil[window.nummer].Aufgaben[random_quest[0]].l[random_answ[3]] + "<br>";          
            
            window.renderMathInElement(document.getElementById("Aufgabe"), {delimiters: [{left: "$$", right: "$$", display: true}, {left: "$", right: "$", display: false}]})                         

             document.getElementById("a1").innerHTML = "a";
             document.getElementById("a2").innerHTML = "b";
             document.getElementById("a3").innerHTML = "c";
             document.getElementById("a4").innerHTML = "d";
        }
        else
        { // normale fragen

    
            document.getElementById("Aufgabe").innerHTML = ds.Teil[nummer].Aufgaben[random_quest[0]].a; //erster DS
            for(let i=0;i<4;i++)
            {
             document.getElementById("a"+(i+1)).innerHTML = ds.Teil[window.nummer].Aufgaben[random_quest[0]].l[random_answ[i]];  // Antwortbutton zufällig würfeln
            }
        }
    
    }
    Antwortwahl(lösung) //lösung entspricht l im Model
    {
        if(window.nummer==1)    //katex
        {   
            let ans=window.katarr[lösung-1];
            console.log("Eingegebene Lösung:" + ans + "\n" +"Richtige Lösung:   "+ window.ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[0]);
            if(ans==window.ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[0])
            {
                window.correct=window.correct+1;
                let tmp=document.getElementById("Aufgabe").innerHTML
                document.getElementById("Aufgabe").innerHTML=  tmp + " Richtig ";
                console.log("Richtige Lösung"+ "(" + window.correct + "von"+ window.counter +")");
            }
            else 
            {
            console.log("Falsche Lösung"+ "(" + window.correct + "von"+ window.counter +")")
            let tmp=document.getElementById("Aufgabe").innerHTML
            document.getElementById("Aufgabe").innerHTML=  tmp + " Falsch ";
            }
            /* Buttons einfärben */
            for (let a=0;a<4;a++)
             {
                if(window.katarr[a]==window.ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[0])
                {
                    document.getElementById("a"+(a+1)).style.color="green" 
                }
                else
                {
                    document.getElementById("a"+(a+1)).style.color="red";
                }
            }

        }
        else if(window.nummer==3) //AJAX
        {
            /*example: curl --user test@gmail.com:secret -X POST -H 'Content-Type: application/json' \
                     https://irene.informatik.htw-dresden.de:8888/api/quizzes/10/solve --data '[2]' */

            var request= new XMLHttpRequest();
            let pw = btoa('test@gmail.com:secret'); 
            request.open('POST',url+window.onlarr[window.counter-1]+"/solve");
            request.setRequestHeader("Authorization", "Basic "+pw);
            request.setRequestHeader('Content-Type', "application/json");
            let a_num=document.getElementById("a"+lösung).getAttribute("a_num");
            request.send("["+a_num+"]");
            //console.log(a_num)
            request.onreadystatechange = function()
            {
                if(this.readyState === 4 && this.status === 200) // ready state 4 = alle daten Empfangen
                {
                    let quest = JSON.parse(this.responseText);
                    console.log(quest);
                    if(quest.success === true)
                    {
                        window.correct=window.correct+1
                        console.log("Richtige Lösung"+ "(" + window.correct + "von"+ window.counter +")");
                        document.getElementById("a"+lösung).style.color="green"

                    }
                    else
                    {
                        console.log("Falsche Lösung"+ "(" + window.correct + "von"+ window.counter +")"); 
                        document.getElementById("a"+lösung).style.color="red" 
                    }   
                }
            }

        }
        else       // normale fragen
        {

            console.log("Eingegebene Lösung:" +document.getElementById("a"+lösung).innerHTML + "\n" +"Richtige Lösung:   "+ window.ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[0]);
            if(document.getElementById("a"+lösung).innerHTML==window.ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[0]) // wenn text im Button = l[0] entspricht dann richtig
            {
            window.correct=window.correct+1;
            document.getElementById("Aufgabe").innerHTML ="Richtig";
            console.log("Richtige Lösung"+ "(" + window.correct + "von"+ window.counter +")");
            }
            else 
            {
            console.log("Falsche Lösung"+ "(" + window.correct + "von"+ window.counter +")")
            document.getElementById("Aufgabe").innerHTML = "Falsch"
            }

            /* Buttons einfärben */
            for(let a=1;a<5;a++)
            {
                if(document.getElementById("a"+a).innerHTML==window.ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[0])
                {
              document.getElementById("a"+a).style.color="green"       
                }
                else 
                {
              document.getElementById("a"+a).style.color="red";
                }
            }
        }
    } 

    next() //enthält auch das Ergebnis
    {   
        ds=window.ds;
        EnableAnswer();
        window.counter=counter+1;
        let name=window.name
        let random_answ=[0,1,2,3];
        RandomizeArray(random_answ);

        /*Progressbar updaten */
        if(window.nummer!=3) {document.getElementById("progbar").value=((window.counter-1)/(window.total_ds-1));}
        else                 {document.getElementById("progbar").value=((window.counter-1)/(window.onlarr.length-1));}

        for(let i=0;i<4;i++)
        {
         document.getElementById("a"+(i+1)).style.color="black";
        }

        /* Result: */
        if((window.nummer!=3 && ((window.counter-1)==window.total_ds)) || ((window.nummer==3) && ((window.counter-1)==window.onlarr.length))) // letzte Aufgabe entspricht "Exit" bei Bedarf umbennen
        {
            Hidebutton();
            document.getElementById("Thema").innerHTML = name + " abgeschlossen";
            correct=window.correct;
            document.getElementById("Aufgabe").innerHTML = "Du hast " + correct + " von " + (counter-1) + " richtig beantwortet"
            

            let percentage=(correct/(window.counter-1))

            if(percentage==1.0){document.getElementById("Aufgabe").innerHTML = "Du hast alle "+ (counter-1)+" Fragen richtig beantwortet, Perfekt! "}
            if(percentage>=0.6 && percentage<1.0){document.getElementById("Aufgabe").innerHTML = "Du hast "+ correct + " von "+ (counter-1) + " Fragen richtig beantwortet, weiter so beim nächsten mal schaffst du alle."}
            if(percentage>=0.2 && percentage<0.6) {document.getElementById("Aufgabe").innerHTML = "Du hast "+ correct + " von "+ (counter-1) + " Fragen richtig beantwortet, da ist noch Luft nach oben."}
            if(percentage<0.2) {document.getElementById("Aufgabe").innerHTML = "Du hast "+ correct + " von "+ (counter-1) + " Fragen richtig beantwortet, das war leider nichts, viel Glück beim nächsten mal."}            

        }
        /* next: */
        else
        {
            if(window.nummer==1)        //katex rendern!
            {
                document.getElementById("Thema").innerHTML = name + " Frage: " + counter;
                for(let i=0;i<4;i++)
                {
                    window.katarr[i]=ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[random_answ[i]];
                }
                //console.log(window.katarr);
            document.getElementById("Aufgabe").innerHTML = ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].a + "<br>" +
                                                           "a: "+ ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[random_answ[0]] + "<br>" +
                                                           "b: "+ ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[random_answ[1]] + "<br>" +
                                                           "c: "+ ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[random_answ[2]] + "<br>" +
                                                           "d: "+ ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[random_answ[3]] + "<br>";          
            window.renderMathInElement(document.getElementById("Aufgabe"), {delimiters: [{left: "$$", right: "$$", display: true}, {left: "$", right: "$", display: false}]})                         

             document.getElementById("a1").innerHTML = "a";
             document.getElementById("a2").innerHTML = "b";
             document.getElementById("a3").innerHTML = "c";
             document.getElementById("a4").innerHTML = "d";
            }
            else if(window.nummer==3)    //Ajax
            {
                document.getElementById("Thema").innerHTML = name + " Frage: " + counter;
                var request= new XMLHttpRequest();
                let pw = btoa('test@gmail.com:secret'); 
                request.open('GET',url+window.onlarr[window.counter-1]);
                request.setRequestHeader("Authorization", "Basic "+pw);
                request.send();
                request.onreadystatechange = function()
                {
                if(this.readyState === 4 && this.status === 200) // ready state 4 = alle daten Empfangen
                    {
                    let quest = JSON.parse(this.responseText);

                    document.getElementById("Aufgabe").innerHTML = quest.text;
                    for(let a=1;a<5;a++)
                        {
                        document.getElementById("a"+a).innerHTML = quest.options[random_answ[(a-1)].valueOf()];
                        document.getElementById("a"+a).setAttribute("a_num",random_answ[(a-1)].toString()); //a_num = id des Antwortbuttons

                        }   
                   } 
                   
                }
                

            }
            else
            {
            document.getElementById("Thema").innerHTML = name + " Frage: " + counter;
            document.getElementById("Aufgabe").innerHTML = ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].a;
            //counter -1 -> da Array mit [0] startet aber counter mit 1
                for(let i=0;i<4;i++)
                {
                document.getElementById("a"+(i+1)).innerHTML = ds.Teil[window.nummer].Aufgaben[random_quest[window.counter-1]].l[random_answ[i]];  // Antwortbutton zufällig würfeln
                }
            }
        }
    
    }   
    
    //AJAX
    ThemenwahlOnl(nr)
    {

        window.counter=1;       
        window.correct=0;
        window.nummer=nr;
        window.name="Online";

        /* Progbar */

        document.getElementById("progbar").value=0;
        document.getElementById("progbar").style.visibility="visible";

        Showbutton();


        console.log("Presenter -> Themenwahl:" +nummer +" = Online");
        document.getElementById("Thema").innerHTML = window.name+" Frage: 1";
        window.onlarr=[10,11,12,13,14,15,16,17,18,19];
        RandomizeArray(window.onlarr)

            let random_answ=[0,1,2,3];
            RandomizeArray(random_answ);
            
        //example: curl  --user test@gmail.com:secret -X GET https://irene.informatik.htw-dresden.de:8888/api/quizzes/x

            var request= new XMLHttpRequest();
            let pw = btoa('test@gmail.com:secret'); //Eingabe encoden/hashen
            request.open('GET', url+window.onlarr[0]);
            request.setRequestHeader("Authorization", "Basic "+pw);
            request.send();

            request.onreadystatechange = function() // "cs 6"
            {
                if(this.readyState === 4 && this.status === 200) // ready state 4 = alle daten Empfangen
                {
                    let quest = JSON.parse(this.responseText);

                    document.getElementById("Aufgabe").innerHTML = quest.text;
                   for(let a=1;a<5;a++)
                    {
                        document.getElementById("a"+a).innerHTML = quest.options[random_answ[(a-1)].valueOf()];
                        document.getElementById("a"+a).setAttribute("a_num",random_answ[(a-1)].toString()); //a_num = id des Antwortbuttons

                    }   
                } 
                
            }
    }
}



//------------------------------------------------------View (Ausgabe)
class View
{
    constructor(p) 
    {
        this.p = p;
        this.setHandler();
    }


setHandler() 
    {

document.getElementById("side-buttons").addEventListener("click",this.Themenenwahl.bind(this));
document.getElementById("answer-buttons").addEventListener("click",this.Antwortwahl.bind(this));
    }

            Themenenwahl(event)
            {
            event.target.style.backgroundColor="baige";
            event.target.style.color="black";
            console.log("Aufgabenwahl:" + event.target.type);
                        
            /* es folgt switch case für themenauswahl */
            if(event.target.id=="sb1"){ this.p.Themenwahl(0);}
            if(event.target.id=="sb2"){ this.p.Themenwahl(1);}
            if(event.target.id=="sb3"){ this.p.Themenwahl(2);}
            if(event.target.id=="sb4"){ this.p.ThemenwahlOnl(3);}
            }
            Antwortwahl(event)
            {
                let p = this.p;     
                console.log("Antwortbutton:" + event.target.type);

                if(event.target.id=="a1"){this.p.Antwortwahl(1);}
                if(event.target.id=="a2"){this.p.Antwortwahl(2);}
                if(event.target.id=="a3"){this.p.Antwortwahl(3);}
                if(event.target.id=="a4"){this.p.Antwortwahl(4);}

                DisableAnswer();
                wait(1600,p.next);
            }
}
