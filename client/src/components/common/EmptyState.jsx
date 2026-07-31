function EmptyState({ message }) {
  return (
    <div className="rounded-lg bg-white py-16 text-center shadow">
      <h2 className="text-gray-500">
        {message}
      </h2>
    </div>
  );
}

export default EmptyState;