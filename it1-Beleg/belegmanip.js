"use strict"

/* Globale Variablen*/
var correct=0;                  //Richtige-Antworten
var counter=0;                  //Aufgaben-Zähler
var nummer=0;                   //Thema-Nummer (1.Allg.,2.Mathe,3.IT.,4.Ajax)
var name="NULL";                //Thema-Name
var ds;                         //Datensätze






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










// Screencast Vorlesung

/*if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch((err) => console.log("Service Worker registration failed", err));
    });
  } */




let ifConnected = window.navigator.onLine; 
if (ifConnected) {}                         //könnte hier einen Wert zurückgeben und gegebenenfalls Online Zeichen einblenden
else {alert('No Connection'); }

 //Quelle:https://riptutorial.com/javascript/example/2020/register-a-service-worker | für Offline Website



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
                '{"a":"Wie viele Menschen leben ungefähr in Deutschland (in Millionen)?",                  "l":["80","130","30","270"]},'+
                '{"a":"In welchem Jahr veröffentlichte Martin Luther seine 95 Thesen in Wittenberg?",      "l":["1517","1417","1714","1515"]},'+
                '{"a":"Wie hieß Deutschland unmittelbar nach dem Ende des ersten Weltkriegs(1919-1933)?",  "l":["Weimarer Republik","Heiliges Römisches Reich","Deutsche Demokratische Republik","Bundesrepublik Deutschland"]},'+
                '{"a":"Wie viele WM-Pokale hat Deutschland bisher gewonnen?",                              "l":["3","0","1","2"]},'+
                '{"a":"Welche folgenden Flaggen enthält die Farben (alle): rot,blau,weiß?",                "l":["Großbritannien","Belgien","Brasillien","Georgien"]},'+
                '{"a":"Wie viele Zähne hat ein erwachsener Mensch normalerweise (mit Weisheitszähnen)?",   "l":["32","36","26","28"]},'+
                '{"a":"Wer wählt den Bundespräsidenten?",                                                  "l":["Bundesversammlung","Bundeskanzler","Bundesrat","Bundestag"]},'+
                '{"a":"Wie heißt die Hauptstadt von Thüringen",                                            "l":["Erfurt","Magdeburg","Dresden","Potsdam"]},'+
                '{"a":"Was bezeichnet ein Oxymoron",                                                       "l":["einen inneren Wiederspruch","ein Satzende","eine Frageform","zwei Worte mit dem selben Anfangsbuchstaben"]},'+
                '{"a":"Was sagte Cäser bei der überquerung des Rubikon",                                   "l":["alea iacte est (der Würfel ist gefallen)","veni vidi vici(Ich kamm, Ich sah, Ich siegte)","divide et empera (teile und herrsche)","ad bestias (zu den wilden Tieren)"]},'+
                '{"a":"Exit","l":["NULL","NULL","NULL","NULL"]}'+
                           ']'+
            '},' +
            '{' + 
            '"Aufgaben"  : [' +
            '{"a":"Ma1","l":["Mj","Mn","Mn","Mn"]},'+
            '{"a":"Ma2","l":["j","n","n","n"]},'+
            '{"a":"Ma3","l":["j","n","n","n"]},'+
            '{"a":"Ma4","l":["j","n","n","n"]},'+
            '{"a":"Ma5","l":["j","n","n","n"]},'+
            '{"a":"Ma6","l":["j","n","n","n"]},'+
            '{"a":"Exit","l":["NULL","NULL","NULL","NULL"]}'+
                            ']'+
            '},' + 
            '{' + 
            '"Aufgaben"  : [' +
            '{"a":"IT1","l":["ITj","ITn","ITn","ITn"]},'+
            '{"a":"IT2","l":["j","n","n","n"]},'+
            '{"a":"IT3","l":["j","n","n","n"]},'+
            '{"a":"IT4","l":["j","n","n","n"]},'+
            '{"a":"IT5","l":["j","n","n","n"]},'+
            '{"a":"Exit","l":["NULL","NULL","NULL","NULL"]}'+
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

    start() {
      


    }


    Themenwahl(nummer) 
    {
        let name;
        if(nummer==0){name="Allgemeinwissen"}       //nummer+name verknüpfen
        if(nummer==1){name="Mathematik"}
        if(nummer==2){name="Internettechnologien"}

        console.log("Presenter -> Themenwahl:" +nummer +"("+ name + ")");

        /* globalen variabeln setzen */

        window.nummer=nummer;
        window.name=name;   
        window.counter=1;       
        window.correct=0;
        /* ------------------------ */

        document.getElementById("Thema").innerHTML = "Thema-"+ name + " Frage: " + counter;
        Showbutton();

        window.ds =  this.m.getDS();
        ds=window.ds;
        // Erste Aufgabe + Buttons des Themenbereichs
        document.getElementById("Aufgabe").innerHTML = "Aufgabe: " + ds.Teil[nummer].Aufgaben[0].a;
        //document.getElementById("a1").innerHTML = ds.Teil[nummer].Aufgaben[0].l[0]; 

        let random_answ=[0,1,2,3];
        RandomizeArray(random_answ);

        for(let i=0;i<4;i++)
        {
        document.getElementById("a"+(i+1)).innerHTML = ds.Teil[window.nummer].Aufgaben[window.counter-1].l[random_answ[i]];  // Antwortbutton zufällig würfeln
        }
    
    }
    Antwortwahl(lösung) //lösung entspricht l im Model
    {
        let tmp=(window.counter)-1;
        console.log("Eingegebene Lösung:" +document.getElementById("a"+lösung).innerHTML + "\n" +"Richtige Lösung:   "+ window.ds.Teil[window.nummer].Aufgaben[tmp].l[0]);
        if(document.getElementById("a"+lösung).innerHTML==window.ds.Teil[window.nummer].Aufgaben[tmp].l[0]) // wenn text im Button = l[0] entspricht dann richtig
        {
            window.correct=window.correct+1;
            document.getElementById("Aufgabe").innerHTML ="Richtig"
            console.log("Richtige Lösung"+ "(" + window.correct + "von"+ window.counter +")")
        }
        else 
        {
            console.log("Falsche Lösung"+ "(" + window.correct + "von"+ window.counter +")")
            document.getElementById("Aufgabe").innerHTML = "Falsch"
        }

        /* Buttons einfärben */
        for(let a=1;a<5;a++)
        {
            if(document.getElementById("a"+a).innerHTML==window.ds.Teil[window.nummer].Aufgaben[tmp].l[0])
            {
              document.getElementById("a"+a).style.color="green"       
            }
            else 
            {
              document.getElementById("a"+a).style.color="red";
            }
        }
    } 

    next() //enthält auch das Ergebnis
    {   ds=window.ds;
        EnableAnswer();
        window.counter=counter+1;
        let name=window.name
        let random_answ=[0,1,2,3];
        RandomizeArray(random_answ);

        for(let i=0;i<4;i++)
        {
         document.getElementById("a"+(i+1)).style.color="black";
        }

        /* Result: */
        if(ds.Teil[window.nummer].Aufgaben[window.counter-1].a=="Exit") // letzte Aufgabe entspricht "Exit" bei Bedarf umbennen
        {
            Hidebutton();
            document.getElementById("Thema").innerHTML = name + " abgeschlossen";
            correct=window.correct;
            document.getElementById("Aufgabe").innerHTML = "Du hast " + correct + " von " + (counter-1) + " richtig beantwortet"
            

            let percentage=(correct/(window.counter-1))

            if(percentage==1.0){document.getElementById("Aufgabe").innerHTML = "Du hast alle "+ (counter-1)+" richtig beantwortet, Perfekt! "}
            if(percentage>=0.6 && percentage<1.0){document.getElementById("Aufgabe").innerHTML = "Du hast "+ correct + " von "+ (counter-1) + " richtig beantwortet, weiter so beim nächsten mal schaffst du alle."}
            if(percentage>=0.2 && percentage<0.6) {document.getElementById("Aufgabe").innerHTML = "Du hast "+ correct + " von "+ (counter-1) + " richtig beantwortet, da ist noch Luft nach oben."}
            if(percentage<0.2) {document.getElementById("Aufgabe").innerHTML = "Du hast "+ correct + " von "+ (counter-1) + " richtig beantwortet, das war leider nichts, viel Glück beim nächsten mal."}            

        }
        /* next: */
        else
        {
        document.getElementById("Thema").innerHTML = "Thema-"+ name + " Frage: " + counter;
        document.getElementById("Aufgabe").innerHTML = "Aufgabe: " + ds.Teil[window.nummer].Aufgaben[window.counter-1].a;
        //counter -1 -> da Array mit [0] startet aber counter mit 1
            for(let i=0;i<4;i++)
            {
            document.getElementById("a"+(i+1)).innerHTML = ds.Teil[window.nummer].Aufgaben[window.counter-1].l[random_answ[i]];  // Antwortbutton zufällig würfeln
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

            }

         /*   evaluate(event)
            {
                console.log("View -> Evaluate " + event.type + " " + event.target.nodeName);
                if(event.target.nodeName.toLowerCase() == "button") {
                    this.p.evaluate(Number(event.target.attributes.getNamedItem("number").value))
                }
    
            } */
            Antwortwahl(event)
            {
                let p = this.p;     
                console.log("Antwortbutton:" + event.target.type);

                if(event.target.id=="a1"){this.p.Antwortwahl(1);}
                if(event.target.id=="a2"){this.p.Antwortwahl(2);}
                if(event.target.id=="a3"){this.p.Antwortwahl(3);}
                if(event.target.id=="a4"){this.p.Antwortwahl(4);}

                DisableAnswer();
                wait(1200,p.next);
            }
}
