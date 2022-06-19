//install puppeteer befor runnning the code
// npm i puppeteer

const puppeteer = require("puppeteer");
const url = "https://www.hackerrank.com/auth/login";
const email = "wawar61538@qqhow.com";
const pw = "246897531";
const { solution } = require("./code");
(async function () {
  try {
    let browserOpen = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"], 
      defaultViewport: null,
    });

    let newTab = await browserOpen.newPage();
    await newTab.goto(url);
    await newTab.type("input[id='input-1']", email, { delay: 50 }); 
    
    await newTab.type("input[id='input-2']", pw, { delay: 50 });
    await newTab.click("button[type='submit']");
    await waitAndClick( "div[data-automation='algorithms']",newTab);
    await waitAndClick("input[value='warmup']",newTab);
    let AllQuestions = await newTab.$$(".challenges-list>a");
    await QuestionSolver(AllQuestions[0],solution,newTab);

  } catch (error) {
    console.log(error);
  }
})();


async function waitAndClick(selector, cpage) {

  try{
    await cpage.waitForSelector(selector);
    let selectToclick = cpage.click(selector);
    return selectToclick;
  } catch(error){
    console.log(error);
  }
 
}

async function QuestionSolver(question, answer, cpage){
    try{
        await question.click();
        await waitAndClick(".checkbox-input", cpage);
        await waitAndClick("textarea.custominput", cpage);
        await cpage.type("textarea.custominput", answer , { delay: 200 });
        await cpage.keyboard.down("Control");
        await cpage.keyboard.press("A");
        await cpage.keyboard.press("X");
        await cpage.keyboard.up("Control");
        await waitAndClick( ".lines-content.monaco-editor-background",cpage);
        await cpage.keyboard.down("Control");
        await cpage.keyboard.press("A");
        await cpage.keyboard.press("V");
        await cpage.keyboard.up("Control");
        await waitAndClick(".hr-monaco-submit", cpage);
    } catch(error){
        console.log(error);
    }
}
