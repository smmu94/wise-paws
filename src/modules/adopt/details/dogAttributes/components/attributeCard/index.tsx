import { ReactNode } from "react";

interface AttributeCardProps {
    icon: ReactNode;
    label: string;
    value: string;
}

export function AttributeCard({ icon, label, value }: AttributeCardProps) {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-light-gray/30 shadow-sm transition-hover hover:shadow-md h-full">
            <div className="mb-3 p-2 bg-salmon/10 rounded-full">{icon}</div>
            <div className="text-center space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-medium-gray font-bold">
                    {label}
                </p>
                <p className="text-body-bolder text-brown capitalize">
                    {value}
                </p>
            </div>
        </div>
    );
}
