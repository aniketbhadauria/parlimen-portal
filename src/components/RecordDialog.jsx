import * as Dialog from "@radix-ui/react-dialog";
import { T } from "../theme.js";

export function RecordDialog({ record, onClose, onSign }) {
  return (
    <Dialog.Root open={Boolean(record)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay" />
        <Dialog.Content
          className="sheet material"
          aria-describedby={undefined}
        >
          {record ? (
            <>
              <p className="text-sm text-moss">{record.kind}, {record.place}</p>
              <Dialog.Title className="display mt-2 text-3xl text-ink">
                {record.title}
              </Dialog.Title>
              <Dialog.Description className="mt-4 max-w-prose text-base text-moss">
                {record.body}
              </Dialog.Description>
              <p className="mt-3 text-sm text-navy">{record.when}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {record.needsSignature ? (
                  <button
                    type="button"
                    className="hit rounded-full px-5 text-white"
                    style={{ background: T.blue }}
                    onClick={() => onSign(record.id)}
                  >
                    Mark as signed
                  </button>
                ) : null}
                <Dialog.Close className="action-pill hit max-w-fit px-5" type="button">
                  Close
                </Dialog.Close>
              </div>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
