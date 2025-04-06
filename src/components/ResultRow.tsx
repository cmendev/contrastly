export default function ResultRow({ label, value }: { label: string; value: boolean }) {
    return (
        <div className="flex justify-between items-center bg-purple-50/50 rounded-lg px-3 py-2">
            <span className="text-purple-800">{label}</span>
            <span className={`font-medium ${value ? 'text-green-600' : 'text-red-500'}`}>
                {value ? 'Pass' : 'Fail'}
            </span>
        </div>
    );
}
