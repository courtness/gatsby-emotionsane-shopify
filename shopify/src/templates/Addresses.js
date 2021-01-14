const Addresses = () => {
  const addressList = document.getElementById(`address-list`);
  const newAddressForm = document.getElementById(`new-address`);
  const addAddressButton = document.getElementById(`add-new-address`);

  const cancelButtons = document.querySelectorAll(`.cancel-address-entry`);
  const deleteAddressButtons = document.querySelectorAll(`.delete-address`);
  const editAddressButtons = document.querySelectorAll(`.edit-address-toggle`);
  const editAddressForms = {};

  document.querySelectorAll(`.edit-address`).forEach((form) => {
    editAddressForms[form.dataset.formId] = form;
  });

  //
  // add a new address

  addAddressButton.addEventListener(
    `click`,
    () => {
      addressList.classList.add(`hidden`);
      newAddressForm.classList.remove(`hidden`);
    },
    false
  );

  //
  // delete an address

  deleteAddressButtons.forEach((button) => {
    button.addEventListener(`click`, (e) => {
      const target = e.target.dataset.target;

      // eslint-disable-next-line no-alert
      if (confirm(`Are you sure you wish to delete this address?`)) {
        Shopify.postLink(target, {
          parameters: { _method: `delete` }
        });
      }
    });
  });

  //
  // edit an existing address

  editAddressButtons.forEach((button) => {
    button.addEventListener(`click`, (e) => {
      addressList.classList.add(`hidden`);
      editAddressForms[e.target.dataset.formId].classList.remove(`hidden`);
    });
  });

  //
  // cancel address entry

  cancelButtons.forEach((button) => {
    button.addEventListener(
      `click`,
      () => {
        Object.keys(editAddressForms).forEach((formKey) => {
          editAddressForms[formKey].classList.add(`hidden`);
        });
        newAddressForm.classList.add(`hidden`);
        addressList.classList.remove(`hidden`);

        window.scrollTo({
          top: 0,
          behavior: `smooth`
        });
      },
      false
    );
  });
};
