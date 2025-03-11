interface Command {
  command: string;
  description: string;
  options: string;
}

interface CommandCardProps {
  command: Command;
}

export default function CommandCard({ command }: CommandCardProps) {
  return (
    <div className="border p-4 mb-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{command.command}</h2>
      <p>{command.description}</p>
      {command.options && <p>例: {command.options}</p>}
    </div>
  );
}
