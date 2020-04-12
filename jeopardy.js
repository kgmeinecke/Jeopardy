// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  categories = [];
  let tempArr = [];

  // generates a random id number and checks to make sure there aren't dupplicates
  while (tempArr.length < 6) {
    const numCategories = Math.floor(Math.random() * 18418) + 1;
    if (!tempArr.includes(numCategories)) {
      tempArr.push(numCategories);
    }
  }

  // calls getCategory function with id
  for (let id of tempArr) {
    await getCategory(id);
  }
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {
  // get random id number
  //let id = getCategoryIds();

  // make api call for id
  const response = await axios.get(
    `http://jservice.io/api/clues?category=${catId}`
  );

  // add questions and answeres to the clueArray
  let cluesArray = response.data.map((result) => {
    let idx = result;
    return {
      question: idx.question,
      answer: idx.answer,
      showing: null,
    };
  });

  // create category object
  let category = {
    title: response.data[0].category.title.toUpperCase(),
    clues: cluesArray,
  };

  // push category object to the categories array
  categories.push(category);
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  // delete thead contents
  const $tableHead = $("thead");
  $tableHead.empty();
  // delete tbody contents
  const $tableBody = $("tbody");
  $tableBody.empty();

  // creat table head
  let $tr = $("<tr></tr>");
  for (let idx of categories) {
    let $th = $(`<th>${idx.title}</th>`);
    $tr.append($th);
  }
  $tableHead.append($tr);

  // create table body
  for (let x = 0; x < 5; x++) {
    let $tr = $(`<tr></tr>`);

    for (let y = 0; y < 6; y++) {
      let $td = $(
        `<td id="${y}-${x}"><i class="fas fa-question fa-4x"></i></td>`
      );
      $tr.append($td);
    }
    $tableBody.append($tr);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

$("tbody").on("click", "td", function handleClick(evt) {
  //console.log($(evt.target).closest("td")[0].id);
  let square = $(evt.target).closest("td")[0].id;

  let categoriesIndex = square.charAt(0);
  let cluesArrayIndex = square.charAt(2);

  let tempArr = categories[categoriesIndex];
  let tempClue = tempArr.clues[cluesArrayIndex].question;
  console.log(tempClue);

  $(evt.target).closest("td").html(tempClue);

  //let temp = categories[categoriesIndex].clues.length;

  //console.log("column = " + square.charAt(0));
  //console.log("row = " + square.charAt(2));

  //console.log($(evt.target).closest("td").html());
});

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  await getCategoryIds();
  fillTable();
}

/** On click of restart button, restart game. */

// TODO

/** On page load, setup and start & add event handler for clicking clues */

// TODO

setupAndStart();
