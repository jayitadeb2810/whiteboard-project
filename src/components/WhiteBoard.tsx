import React, {
  useState,
  useRef,
  useEffect,
} from "react"

const Whiteboard: React.FC = () => {
  const canvasRef =
    useRef<HTMLCanvasElement>(null)
  const [context, setContext] =
    useState<CanvasRenderingContext2D | null>(
      null
    )
  const [isDrawing, setIsDrawing] =
    useState<boolean>(false)
  const [brushColor, setBrushColor] =
    useState<string>("#000000")
  const [brushSize, setBrushSize] =
    useState<number>(5)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        setContext(ctx)
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        ctx.strokeStyle = brushColor
        ctx.lineWidth = brushSize
      }
    }
  }, [brushColor, brushSize])

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent
    if (context) {
      context.beginPath()
      context.moveTo(offsetX, offsetY)
      setIsDrawing(true)
    }
  }

  const finishDrawing = () => {
    if (context) {
      context.closePath()
      setIsDrawing(false)
    }
  }

  const draw = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return
    const { offsetX, offsetY } = nativeEvent
    context.lineTo(offsetX, offsetY)
    context.stroke()
  }

  const clearCanvas = () => {
    if (context) {
      context.clearRect(
        0,
        0,
        context.canvas.width,
        context.canvas.height
      )
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
      <div>
        <input
          type="color"
          value={brushColor}
          onChange={(e) =>
            setBrushColor(e.target.value)
          }
        />
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) =>
            setBrushSize(parseInt(e.target.value))
          }
        />
        <button onClick={clearCanvas}>
          Clear
        </button>
      </div>
    </div>
  )
}

export default Whiteboard
