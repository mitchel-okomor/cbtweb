import swal from 'sweetalert';

const swalAlert = (title, text, icon, button) => {
  return swal({
    title: title,
    text: text,
    icon: icon,
    button: button
  });
};

export default swalAlert;
