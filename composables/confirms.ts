import { useConfirm } from "primevue/useconfirm";

export const confirms = () => {
  const confirms = useConfirm()
  return {
    deleteConfirm(event: { currentTarget: any; }, item: { [x: string]: any; }, key: string | number, deleteCallback: any): void {
      console.log(event)
      console.log(item)
      console.log(key)
      console.log(deleteCallback)
      const message = item[key] ? item[key] : item
      confirms.require({
        target: event.currentTarget,
        message: `Do you want to delete ${message}?`,
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: () => {
          deleteCallback(item);
        },
        reject: () => {
        },
      });
    }
  }
}