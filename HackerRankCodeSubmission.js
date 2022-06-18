//Install puppeteer before running the code
// npm i puppeteer
const puppeteer = require("puppeteer");
const url = "https://www.hackerrank.com/auth/login";
const email = "wawar61538@qqhow.com";
const pw = "246897531";
const { solution } = require("./code");
let page;
let browserOpen = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
});
browserOpen
  .then(function (browserOpenobj) {
    let browserOpenPromise = browserOpenobj.newPage();
    return browserOpenPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(url);
    return hackerRankOpenPromise;
  })
  .then(function () {
    let emailEnterPromise = page.type("input[id='input-1']", email, {
      delay: 50,
    });
    return emailEnterPromise;
  })
  .then(function () {
    let enterPwpromise = page.type("input[id='input-2']", pw, { delay: 50 });
    return enterPwpromise;
  })
  .then(function () {
    let clickOnloginButtonPromise = page.click("button[type='submit']");
    return clickOnloginButtonPromise;
  })
  .then(function () {
    let clickOnALgoPromise = waitAndClick(
      "div[data-automation='algorithms']",
      page
    );
    return clickOnALgoPromise;
  })
  .then(function () {
    let warmUpClickPromise = waitAndClick("input[value='warmup']", page);
    return warmUpClickPromise;
  })
  .then(function () {
    let waitForPageLoading = page.waitFor(3000);
    return waitForPageLoading;
  })
  .then(function () {
    let allChallengesPromise = page.$$(".challenges-list>a"); 
    return allChallengesPromise;
  })
  .then(function (Questions) {
    let questionSolvePromise = QuestionSolver(Questions[0], page, solution[0]);
    return questionSolvePromise;
  });


// this function will untill selector is identified and then click on it
function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitforModelPromise = cPage.waitForSelector(selector);
    waitforModelPromise
      .then(function () {
        let clickModel = cPage.click(selector);
        return clickModel;
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        reject();
      });
  });
}

//Question Solver
function QuestionSolver(question, cpage, ans) {
  return new Promise(function (resolve, reject) {
    let questionClickPromise = question.click();
    questionClickPromise
      .then(function () {
        let clickOneditor = waitAndClick(
          ".lines-content.monaco-editor-background",
          cpage
        );
        return clickOneditor;
      })
      .then(function () {
        return waitAndClick(".checkbox-input", cpage);
      })
      .then(function () {
        return waitAndClick("textarea.custominput", cpage);
      })
      .then(function () {
        return cpage.type("textarea.custominput", ans);
      })
      .then(function () {
        return cpage.keyboard.down("Control");
      })
      .then(function () {
        return cpage.keyboard.press("A");
      })
      .then(function () {
        return cpage.keyboard.press("X");
      })
      .then(function () {
        return cpage.keyboard.up("Control");
      })
      .then(function () {
        let clickOneditor = waitAndClick(
          ".lines-content.monaco-editor-background",
          cpage
        );
        return clickOneditor;
      })
      .then(function () {
        return cpage.keyboard.down("Control");
      })
      .then(function () {
        return cpage.keyboard.press("A");
      })
      .then(function () {
        return cpage.keyboard.press("V");
      })
      .then(function () {
        return cpage.keyboard.up("Control");
      })
      .then(function () {
        return waitAndClick(".hr-monaco-submit", cpage);
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        reject();
      });
  });
}
