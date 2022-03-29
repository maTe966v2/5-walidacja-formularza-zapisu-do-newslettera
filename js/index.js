const inputs = document.querySelectorAll("input");
const arrayOfInputs = [...inputs];
const errorsList = document.querySelector(".errors-list");
const submitButton = document.querySelector("input[type=submit]");

const acceptAgreements = e => {
    arrayOfInputs.map(input => {
        if (input.id === "first-accept" || input.id === "second-accept") {
            input.checked = e.target.checked;
            input.disabled = e.target.checked;
        }
        // Jak to zapisać w operatorze warunkowym bo nie wychodzi :P
    });
};

arrayOfInputs.map(
    input =>
        input.id === "all-accept" &&
        input.addEventListener("click", acceptAgreements)
);

const createElement = text => {
    let errorMsgElement = document.createElement("li");
    errorMsgElement.innerText = text;
    errorsList.appendChild(errorMsgElement);
};

const handleErrors = errors => {
    errors.map(error => {
        switch (error.id) {
            case "name":
                createElement("Wpisz imię!");
                break;
            case "email":
                createElement("Wpisz email!");
                break;
            case "first-accept":
                createElement("Zaznacz zgodę!");
                break;
        }
    });
};

const sendForm = () => {
    createElement("Forma wysłana!");
};

const validate = () => {
    let errors = [];

    errorsList.innerHTML = "";

    arrayOfInputs.map(input => {
        if (!input.value) {
            errors.push(input);
        } else if (input.id === "first-accept") {
            !input.checked && errors.push(input);
        } else if (input.id === "email") {
            !input.value.includes("@") && errors.push(input);
        }
        // jak sprawdzić else if jednocześnie czy się zgadza id i czy jest checked ?
    });
    return errors.length ? handleErrors(errors) : sendForm();
};

const submitForm = e => {
    e.preventDefault();
    validate();
};

submitButton.addEventListener("click", submitForm);
