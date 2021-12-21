import { getUserInfo } from "./EmailSectionServices";
import styles from "../Account.module.css";
import { changeFindMeByEmail } from "./EmailSectionServices";
import configureStore from "../../../redux/store";
import {
  updateEmail,
  updateLetPeopleFindBlogByEmail,
  updateConfirmedPassword,
} from "../../../redux/EmailSection";

/**
 * this function handle the click on the cancel button in the email section
 * @type {function}
 * @param {*} event
 * @returns {void} return nothing , it just a click event handler
 */
const cancelButtonClick = (event,previousEmail) => {
  // if the user entered invalid email or password then cancel the operation
  // remove the transition "immediate change " but you should put it again
  // so it will when the user click on the edit button agian
  document.querySelectorAll(".error-message").forEach((element) => {
    element.style.visibility = "hidden";
    element.style.transition = "none";
  });
  /**
   * get all Cancel buttons
   * @type {Array<Element>}
   */
  const allButtons = document.querySelectorAll(`.${styles["cancel-button"]}`);
  console.log(document.querySelector("#email-section-buttons"));
  if (event.target === allButtons[0]) {
    document
      .querySelector(
        `.${styles["change-email-section"]} input[type="password"]`
      )
      .classList.toggle(`${styles.hidden}`);
    // hide the password box
    document
      .querySelector(`.${styles["change-email-section"]} input[type="email"]`)
      .classList.toggle(`${styles["before-focus-on-edit"]}`); // remove the borders from the email box by toggle the class
    document
      .querySelector("#email-section-buttons")
      .classList.toggle(`${styles.hidden}`);
    // hide the buttons
    document
      .getElementsByTagName("img")[0]
      .classList.toggle(`${styles.hidden}`);
    // display the edit icon again
  }
  document.querySelectorAll("form >div").forEach((element) => {
    element.style.opacity = "1";
  });

  document.querySelectorAll("form")[0].style.pointerEvents = "all";
  // the change that has happen will be ignored
  // updateInfo((prevState) => ({
  //   ...prevState,
  //   email: prevState.previousEmail,
  // }));
  configureStore.dispatch(updateEmail(previousEmail));
};

/**
 * retreive the data from the backend when the component mounted
 * @type {function}
 * @param {*} event
 * @returns {void} return nothing , it just a click event handler
 */
const componentDidMount = () => {
  getUserInfo();
  // let emailCancelButton = document.querySelector(
  //   `[data-testid="email-cancel-button"]`
  // );
  // console.log(emailCancelButton);
  // emailCancelButton.addEventListener("click",()=>{
  //   console.log("yes yes yes ") 
  // })
};

/**
 * this function handle the click on the edit icon button
 * @type {function}
 * @param {*} event
 * @returns {void} return nothing , it just a click event handler
 */
const iconClick = (event) => {
  document.querySelectorAll(".error-message").forEach((element) => {
    element.style.transition = "0.5s .1s linear";
  });

  // if they set to zero
  /**
   * array to get the icon photo
   * @type {Array<Element>}
   *
   */
  const imgs = document.querySelectorAll(`.${styles["icon-photo"]}`);
  if (event.target.id === "email-box" || event.target === imgs[0]) {
    document
      .querySelectorAll(`.${styles["change-email-section"]} .${styles.hidden}`)
      .forEach((element) => {
        element.classList.toggle(`${styles.hidden}`);
        // if you click on the Email or on the Edit icon the Email box will apear and the confirm password box will appear too
        // How I select this element? as regular selector .classX .classY{} then forEach one of them toggle the hidden class
      });

    document
      .querySelector("#email-box")
      .classList.remove(`${styles["before-focus-on-edit"]}`);
    document
      .getElementsByClassName(`${styles["icon-photo"]}`)[0]
      .classList.toggle(`${styles.hidden}`);

    /**
     * get the Email section
     * @type {Array<Element>}
     *
     */
    const changeEmailSection = document.getElementsByClassName(
      `${styles["change-email-section"]}`
    )[0];
    const entireForm = document.getElementsByTagName("form")[0];
    entireForm.style.pointerEvents = "none";
    document.querySelectorAll("form >div").forEach((element) => {
      element.style.opacity = "0.5";
    });
    changeEmailSection.style.pointerEvents = "all";
    changeEmailSection.style.opacity = "1";
  }
};

/**
 * this function handle any change in the states
 * @type {function}
 * @param {*} event
 * @returns {void}
 */
const changeInput = (event) => {
  document.querySelectorAll(".error-message").forEach((element) => {
    // if the user enter invalid input then try to enter new values
    element.style.visibility = "hidden";
  });
  if (event.target.type === "email") {
    configureStore.dispatch(updateEmail(event.target.value));
  } else if (event.target.id === "emailcurrentpassword") {
    configureStore.dispatch(updateConfirmedPassword(event.target.value));
  } else {
    const sentData = {
      findMeByEmail: event.target.checked,
    };
    // let token = localStorage.getItem("token");
    // api.post("/api/user/settings-save", sentData,{headers:{
    //   Authorization: token,
    // }}).then((respone)=>{
    //   console.log(respone)
    // });
    changeFindMeByEmail(sentData);
    configureStore.dispatch(
      updateLetPeopleFindBlogByEmail(event.target.checked)
    );
  }
};

export { componentDidMount, iconClick, changeInput,cancelButtonClick };
