import { Button } from "@nextui-org/react";

interface AppendButtonProps {
  handleAppend: () => void;
}

export function AppendButton({ handleAppend }: AppendButtonProps) {
  return (
    <div className="mt-8 flex justify-center uppercase">
      <Button
        size="lg"
        variant="shadow"
        color="warning"
        onClick={handleAppend}
        className="uppercase text-sm font-bold"
      >
        Ver más
      </Button>
    </div>
  );
}
