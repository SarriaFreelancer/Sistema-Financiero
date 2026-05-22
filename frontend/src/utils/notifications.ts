import Swal from "sweetalert2";

export const notifySuccess = (title: string, text?: string) =>
  Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#2563eb",
    background: "#09090b",
    color: "#ffffff",
  });

export const notifyError = (title: string, text?: string) =>
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#ef4444",
    background: "#09090b",
    color: "#ffffff",
  });

export const confirmAction = async (title: string, text?: string) => {
  const result = await Swal.fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#27272a",
    background: "#09090b",
    color: "#ffffff",
  });

  return result.isConfirmed;
};
