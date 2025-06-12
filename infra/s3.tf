resource "aws_s3_bucket" "deals" {
  bucket = "deal-attachments"
  versioning {
    enabled = true
  }
  lifecycle_rule {
    id      = "expire-old"
    enabled = true
    expiration {
      days = 365
    }
  }
}
