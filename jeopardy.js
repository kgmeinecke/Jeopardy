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

function getCategoryIds() {
  const numCategories = Math.floor(Math.random() * 18418) + 1;
  return numCategories;
  //   categoryIds = [];
  //   for (let i = 0; i < 6; i++) {
  //     const numCategories = Math.floor(Math.random() * 18418) + 1;
  //     categoryIds.push(numCategories);
  //   }
  //   return categoryIds;
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
  let id = getCategoryIds();

  // make api call for id
  const response = await axios.get(
    `http://jservice.io/api/clues?category=${id}`
  );

  // add questions and answeres to the clueArray
  let clueArray = response.data.map((result) => {
    let idx = result;
    return {
      question: idx.question,
      answer: idx.answer,
      showing: null,
    };
  });

  // create category object
  let category = {
    title: response.data[0].category.title,
    clues: clueArray,
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

async function fillTable() {}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {}

/** On click of restart button, restart game. */

// TODO

/** On page load, setup and start & add event handler for clicking clues */

// TODO
