const {
  addContact,
  removeContact,
  getContactById,
  listContacts,
} = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      if (!newContact) {
        console.error(`Error adding contact: ${name}!`);
      } else {
        console.log("Contact added successfully!");
        console.table(newContact);
      }
      break;

    case "remove":
      const newContacts = await removeContact(id);
      if (!newContacts) {
        console.error(`Contact with id: ${id} not found`);
      } else {
        console.log(`Contact with id: ${id} deleted completely, new list:`);
        console.table(newContacts);
      }

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
