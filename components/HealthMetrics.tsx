"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { Activity, Heart, MapPin, TrendingUp } from "lucide-react"
import { MetricDisplay } from "./ui/MetricDisplay"
import { Badge } from "./ui/Badge"
import { Card } from "./ui/Card"

export function HealthMetrics() {
  const { healthData, getHealthStatus } = useMindGarden()
  const status = getHealthStatus()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Health Metrics</h3>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4">
        <MetricDisplay icon={Activity} value={healthData.steps.toLocaleString()} label="Steps Today" color="#A8D5BA" />
        <MetricDisplay icon={Heart} value={healthData.heartRate} label="BPM" color="#E9A1B0" />
        <MetricDisplay icon={MapPin} value={healthData.distance} label="km Today" color="#F4D35E" />
      </div>

      {/* Health Status */}
      <Card className="bg-gradient-to-br from-[#A8D5BA]/10 to-[#C5CAE9]/10 border-[#A8D5BA]/20">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="text-[#A8D5BA]" size={20} />
          <h4 className="font-semibold text-gray-800">Health Status</h4>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Activity Level:</span>
            <Badge variant={status.isActive ? "success" : "warning"}>
              {status.isActive ? "Active" : "Low Activity"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Stress Level:</span>
            <Badge variant={status.isCalm ? "success" : "danger"}>{status.isCalm ? "Calm" : "Elevated"}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Mobility:</span>
            <Badge variant={status.isAtHome ? "warning" : "success"}>
              {status.isAtHome ? "Mostly Home" : "Mobile"}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}
